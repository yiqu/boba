import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, Subject, from, of, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError, delay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Router } from '@angular/router';
import { User, AuthInfo, VerifiedUser } from '../models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
// import the firebase under firebase/app, then we need to manually import the auth package
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseSignInWithPasswordUrl: string = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword";
  private baseSignUpUrl: string = "https://identitytoolkit.googleapis.com/v1/accounts:signUp";

  currentUser$: BehaviorSubject<VerifiedUser> = new BehaviorSubject<VerifiedUser>(null);
  authStateResolved$: Subject<any> = new Subject<any>();
  authErrMsg: string;
  authLoading: boolean = false;

  constructor(public http: HttpClient, public firestore: AngularFireDatabase,
    public router: Router, public sbs: SnackbarService) {
      firebase.auth().onAuthStateChanged(
        (user: firebase.User) => {
          if (user) {
            const u = (<VerifiedUser>user.toJSON());
            this.currentUser$.next(u);
          } else {
            this.currentUser$.next(undefined);
          }
          this.authStateResolved$.next(true);
        },
        (err) => {
          this.sbs.openSnackBar("Error: " + err.code + err.message);
        },
        () => {
        }
      );
  }

  handleError(err: HttpErrorResponse) {
    return throwError(err);
  }


  createUser(authInfo: AuthInfo) {
    this.authErrMsg = null;
    let sess: string = authInfo.saveSession ?
      firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION;
    firebase.auth().setPersistence(sess)
    .then(() => {
      this.authLoading = true;
      return firebase.auth().createUserWithEmailAndPassword(authInfo.id, authInfo.password);
    })
    .then(
      (u: firebase.auth.UserCredential) => {
        this.router.navigate(['/']);
      },
      (rej) => {
        this.authErrMsg = this.getFirebaseErrorMsg(rej);
      }
    ).finally(() => {
      this.authLoading = false;
    });
  }

  /**
   * Existing and future Auth states are now persisted in the current
   * session only. Closing the window would clear any existing state even
   * if a user forgets to sign out.
   * New sign-in will be persisted with session persistence.
   *
   */
  loginUser(authInfo: AuthInfo) {
    this.authErrMsg = null;
    let sess: string = authInfo.saveSession ?
      firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION;
    firebase.auth().setPersistence(sess)
    .then(() => {
      this.authLoading = true;
      return firebase.auth().signInWithEmailAndPassword(authInfo.id, authInfo.password);
    })
    .then(
      (u: firebase.auth.UserCredential) => {
        this.router.navigate(['/']);
      },
      (rej) => {
        this.authErrMsg = this.getFirebaseErrorMsg(rej);
      }
    ).finally(() => {
      this.authLoading = false;
    });
  }

  signoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }

  getFirebaseErrorMsg(err: any): string {
    if (err) {
      return this.decodeFireBaseErr(err);
    }
    return "Server error occured, but could not get a detailed message from backend."
  }

  decodeFireBaseErr(err: any): string {
    let errMsg: string = "Server error occured."
    switch (err.code) {
      case "auth/email-already-in-use": {
        errMsg = "Email already exists.";
        break;
      }
      case "auth/invalid-email": {
        errMsg = "Email is invalid.";
        break;
      }
      case "auth/operation-not-allowed": {
        errMsg = "This operation is currently not allowed.";
        break;
      }
      case "auth/weak-password": {
        errMsg = "Password is too weak, try 6+ characters.";
        break;
      }
      case "auth/user-not-found": {
        errMsg = "User does not exist.";
        break;
      }
      case "auth/wrong-password": {
        errMsg = "Invalid password.";
        break;
      }
      case "": {
        errMsg = "BLAH.";
        break;
      }
    }
    return errMsg + " " + err['message'];
  }


  handleFirebaseSignInUpError(errResponse) {
    console.log(errResponse)
    let errMessage: string = "An server error has occured.";
    if (!errResponse.error || !errResponse.error.error) {
      return throwError(errMessage);
    }
    switch (errResponse.error.error.message) {
      case "EMAIL_EXISTS": {
        errMessage = "This email has already been registered.";
        break;
      }
      case "TOO_MANY_ATTEMPTS_TRY_LATER": {
        errMessage = "Too many failed login attempts, try again later.";
        break;
      }
      case "WEAK_PASSWORD": {
        errMessage = "Password should be at least 6 characters";
        break;
      }
      case "EMAIL_NOT_FOUND": {
        errMessage = "The account you are trying to sign in with does not exist.";
        break;
      }
      case "INVALID_PASSWORD": {
        errMessage = "Invalid password.";
        break;
      }
      case "USER_DISABLED": {
        errMessage = "This user has been disabled";
        break;
      }
      default: {
        errMessage = errResponse.error.error.message;
      }
    }
    return throwError(errMessage);
  }




}
