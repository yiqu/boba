import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User, AuthInfo, VerifiedUser, AuthInfoFromUser } from '../models/user.model';
// import the firebase under firebase/app, then we need to manually import the auth package
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { SnackbarService } from './snackbar.service';
import { AppState } from '../../redux-stores/global-store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../redux-stores/auth/auth.actions';
import { LoginSuccessActionProp, UserRegistrationFromEmailActionProp } from '../../redux-stores/auth/auth.models';
import * as UserActions from '../../redux-stores/user/user.actions';
import { AngularFirestore } from '@angular/fire/firestore';

const LOCAL_STORAGE_USER_KEY: string = "VERIFIED_USER";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // this determines if firebase auth has emitted the first result,
  // if it has not, don't redirect to /, or resume redirect operations
  firstAuthUserFetchCallAndRedirect: boolean = false;

  constructor(public router: Router, public sbs: SnackbarService, public store: Store<AppState>,
    private afs: AngularFirestore) {

      firebase.auth().onAuthStateChanged(
        (user: firebase.User) => {
          console.log("Firebase State AUTH:", user ? user.toJSON() : user);
          this.handleOnAuthChange(user);
        },
        (err) => {
          this.sbs.openSnackBar("Error authenticating user: " + err['code'] + err['message']);
        },
        () => {
        }
      );

  }

  handleOnAuthChange(fireUser: firebase.User) {
    if (fireUser) {
      const u = (<VerifiedUser>fireUser.toJSON());
      this.setVerifiedUser(u, this.firstAuthUserFetchCallAndRedirect, true);
      this.store.dispatch(UserActions.getUserProfileStart());
    } else {
      this.unsetVerifiedUser();
    }

    this.store.dispatch(UserActions.getUserDBEntryStart({uid: fireUser?.uid}));
    this.firstAuthUserFetchCallAndRedirect = true;
  }

  throwErrorMessage(msg: string) {
    this.store.dispatch(AuthActions.authThrowErrorMessageByUser({errorMsg: msg}));
  }

  registerUser(authInfo: AuthInfoFromUser) {
    const p = new UserRegistrationFromEmailActionProp(authInfo.id, authInfo.password, authInfo.saveSession);
    this.store.dispatch(AuthActions.authUserRegistrationFromEmailStart(p));
  }

  signoutUser() {
    this.store.dispatch(AuthActions.authLogoutStart());
  }

  userLogin(authInfo: AuthInfoFromUser) {
    this.store.dispatch(AuthActions.authLoginStart({authInfo: authInfo}));
  }

  setVerifiedUser(u: VerifiedUser, redirect: boolean, showAlert?: boolean) {
    const prop = new LoginSuccessActionProp(u, redirect, showAlert, false);
    this.store.dispatch(AuthActions.authLoginSuccess(prop));
  }

  unsetVerifiedUser() {
    this.store.dispatch(AuthActions.authLogoutSuccess({redirect: false}));
  }

  clearErrors() {
    this.store.dispatch(AuthActions.authClearErrorsByUser());
  }

  autoLoginFromLocalStorage() {
    const u: VerifiedUser = this.getUserFromLocalStorage();
    if (u) {
      this.store.dispatch(AuthActions.authAutoLogin({user: u}))
    }
  }

  private getUserFromLocalStorage(): VerifiedUser | null{
    const localStorageUser: any = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY));
    if (!localStorageUser) {
      return null;
    }
    console.info("Local Storage: User Present");
    return localStorageUser;
  }
}
