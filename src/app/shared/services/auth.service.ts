import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, Subject, from, of, throwError, BehaviorSubject, EMPTY } from 'rxjs';
import { map, catchError, delay, tap, take, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/database';
import { Router } from '@angular/router';
import { User, AuthInfo, VerifiedUser } from '../models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
// import the firebase under firebase/app, then we need to manually import the auth package
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { SnackbarService } from './snackbar.service';
import { UserService } from './user.service';
import { RestDataFireService } from './fire-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseSignInWithPasswordUrl: string = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword";
  private baseSignUpUrl: string = "https://identitytoolkit.googleapis.com/v1/accounts:signUp";
  private usersBaseUrl: string = "users/";
  private aliasesUrl: string = "inAppAliases";

  currentUser$: BehaviorSubject<VerifiedUser> = new BehaviorSubject<VerifiedUser>(null);
  authErrMsg: string;
  authLoading: boolean = false;
  appAuthHasLoaded: boolean = false;
  signupErrorOccured$: Subject<string> = new Subject<string>();
  userAliasFL: AngularFireList<User>;
  userAlias$: Observable<User[]>;
  currentUserSnapshot: VerifiedUser;


  constructor(public http: HttpClient, public firedb: AngularFireDatabase,
    public router: Router, public sbs: SnackbarService, public us: UserService,
    public fds: RestDataFireService) {
      firebase.auth().onAuthStateChanged(
        (user: firebase.User) => {
          if (user) {
            const u = (<VerifiedUser>user.toJSON());
            console.log("AUTH", u)
            this.mergeUserFromDbAndFirebase(u);
          } else {
            this.setCurrentUserSnapshot(null);
            this.toggleAuthLoaded(true);
            this.currentUser$.next(undefined);
          }
        },
        (err) => {
          this.sbs.openSnackBar("Error authenticating user: " + err['code'] + err['message']);
        },
        () => {
        }
      );

  }

  toggleAuthLoaded(loaded: boolean) {
    this.appAuthHasLoaded = loaded;
  }

  /**
   * Dont need
   */
  setUpUserRelated(u: VerifiedUser) {
    this.setCurrentUserSnapshot(u);
    this.userAliasFL = this.firedb.list(this.usersBaseUrl + u.uid + "/" + this.aliasesUrl);
    this.userAlias$ = this.userAliasFL.snapshotChanges().pipe(
      map((changes) => this.addfireKey(changes))
    );
  }

  /**
   * Merge the Firebase user and currently stored user account together.
   * Update the last login array
   * Then broadcast the newly merged user info.
   */
  mergeUserFromDbAndFirebase(u: VerifiedUser) {
    this.fds.getFireDB().ref("users/" + u.uid).once("value").then(
      (snap) => {
        let g = snap.val();
        if (g.inAppAliases) {
          // update login time
          if (g.logins) {
            // check to make sure it's not duplicate login time. Every refresh will cause this, so it could be duplicate
            if (g.logins[g.logins.length-1] !== u.lastLoginAt) {
              g.logins.push(u.lastLoginAt);
            }
          } else {
            g['logins'] = [];
            g.logins.push(u.lastLoginAt);
          }

          this.toggleAuthLoaded(true);
          this.currentUser$.next(g);
          setTimeout(() => {
            this.fds.getFireDB().ref("users/" + u.uid).update(g);
          }, 1000);
        }
      },
      (rej) => {
        this.sbs.openSnackBar("Error merging user info.");
        console.log("error getting user:", rej);
      }
    ).then(
      (res) => {
      },
      (err) => {
        this.sbs.openSnackBar("Error updating user's login time.");
        console.log("error getting user:", err);
      }
    )
  }


  handleError(err: HttpErrorResponse) {
    return throwError(err);
  }

  setCurrentUserSnapshot(u) {
    this.currentUserSnapshot = u;
  }

  clearCurrentUserSnapshot() {
    this.currentUserSnapshot = null;
  }

  createUser(authInfo: AuthInfo) {
    this.toggleAuthLoaded(false);
    this.clearCurrentUserSnapshot();
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
        const user: VerifiedUser = <VerifiedUser>u.user.toJSON();
        // set current user snapshot, so can access it in the next then()
        this.setCurrentUserSnapshot(user);
        const userIdRef = firebase.database().ref(this.usersBaseUrl + user.uid);
        return userIdRef.set(user);
      },
      (rej) => {
        this.authErrMsg = this.getFirebaseErrorMsg(rej);
        return "ERROR";
      }
    ).then(
      (res) => {
        if (res !== "ERROR") {
          if (this.currentUserSnapshot) {
            const aliasName: string = this.createInitAlias(this.currentUserSnapshot.email);
            // user alias here includes name, id, and original Firebase User object
            const initAlias = new User(aliasName, aliasName, this.currentUserSnapshot);
            const userAliasRef = firebase.database().ref(this.usersBaseUrl + this.currentUserSnapshot.uid + "/" +
              this.aliasesUrl + "/alias");
            return userAliasRef.set(initAlias)
          }
        }
        // return error due to signup failure. i.e. email exists, etc.
        return "ERROR";
      },
      (err) => {
        console.error(err);
        this.sbs.openSnackBar("Server error occured: " +  err['code']);
        return "ERROR";
      }
    ).then(
      (res) => {
        if (res !== "ERROR") {
          this.fds.getFireDB().ref("users/" + this.currentUserSnapshot.uid).once("value").then(
            (snap: any) => {
              this.currentUser$.next(snap.val());
              this.router.navigate(['/']);
              this.toggleAuthLoaded(true);
            }
          )
        }
      },
      (err) => {
        console.error("err on alias", err);
      }
    )
    .finally(() => {
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
    this.toggleAuthLoaded(false);
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
        this.toggleAuthLoaded(true);
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
        this.signupErrorOccured$.next('email-already-in-use');
        break;
      }
      case "auth/invalid-email": {
        errMsg = "Email is invalid.";
        this.signupErrorOccured$.next('invalid-email');
        break;
      }
      case "auth/operation-not-allowed": {
        errMsg = "This operation is currently not allowed.";
        break;
      }
      case "auth/weak-password": {
        errMsg = "Password is too weak, try 6+ characters.";
        this.signupErrorOccured$.next('weak-password');
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


  createInitAlias(email: string): string {
    return email.substr(0, email.indexOf("@"));
  }

  addfireKey(c: SnapshotAction<any>[]) {
    return c.map((c: SnapshotAction<any>) => {
      return (
        { fireKey: c.payload.key,
          ...c.payload.val()
        }
      )}
    );
  }
}
