import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { AuthInfo, VerifiedUser, InAppAlias, User } from '../../shared/models/user.model';
import { LoginSuccessActionProp, LoginFailureActionProp, AuthVerifiedUserProp } from './auth.models';
import * as AuthUtils from '../../shared/utils/auth.utils';
import * as fromAuthActions from './auth.actions';
import * as fromRouterActions from '../router-related/router-related.actions';
import * as fromLsActions from '../local-storage/local-storage.actions';
import { ToasterService } from '../../shared/services/toastr.service';
import { FirebasePromiseError } from '../../shared/models/firebase.model';

@Injectable()
export class AuthEffects {

  private usersBaseUrl: string = "users/";

  constructor(public as: AuthService, public actions$: Actions,
    public router: Router, public route: ActivatedRoute, private ts: ToasterService,
    private afs: AngularFirestore) {
  }

  userLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAuthActions.authLoginStart),
      switchMap((authInfo) => {
        const userInfo: AuthInfo = authInfo.authInfo;
        const sessionType: string = userInfo.saveSession ?
          firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION;

        return firebase.auth().setPersistence(sessionType)
          .then(() => {
            return firebase.auth().signInWithEmailAndPassword(userInfo.id, userInfo.password);
          })
          .then(
            (u: firebase.auth.UserCredential) => {
              return fromAuthActions.authLoginFirebaseRequestSuccess();
            },
            (rej) => {
              const authErrMsg = AuthUtils.getFirebaseErrorMsg(rej);
              const prop = new LoginFailureActionProp(authErrMsg);
              return fromAuthActions.authLoginFailure(prop);
            }
          )
      })
    )
  });

  userLogout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAuthActions.authLogoutStart),
      switchMap(() => {
        return firebase.auth().signOut()
        .then(() => {
          return fromAuthActions.authLogoutSuccess({redirect: true, showAlert: true});
        });
      }));
  });

  userRegistration$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAuthActions.authUserRegistrationFromEmailStart),
      switchMap((registerInfo) => {
        const sessionType: string = registerInfo.saveSession ?
          firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION;

        return  firebase.auth().setPersistence(sessionType)
          .then(() => {
            return firebase.auth().createUserWithEmailAndPassword(registerInfo.userEmail, registerInfo.password);
          })
          .then(
            (u: firebase.auth.UserCredential) => {
              this.ts.getSuccess("Your account has been successfully registered.");
              const user: VerifiedUser = <VerifiedUser>u.user.toJSON();
              user.inAppAliases = JSON.parse(JSON.stringify(new InAppAlias(JSON.parse(JSON.stringify(new User(user.uid, user.email, {...user}))))));
              const p = new AuthVerifiedUserProp(user);
              return fromAuthActions.authAddNewRegisteredUserToDatabase(p);
            },
            (rej) => {
              const authErrMsg = AuthUtils.getFirebaseErrorMsg(rej);
              const prop = new LoginFailureActionProp(authErrMsg);
              return fromAuthActions.authUserRegistrationFromEmailFailure(prop);
            }
          );

      }));
  });

  userRegistrationAddToDB$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAuthActions.authAddNewRegisteredUserToDatabase),
      switchMap((user) => {
        const userIdDoc: AngularFirestoreDocument = this.afs.doc(this.usersBaseUrl + user.user.uid);
        return userIdDoc.set(user.user).then(() => {
          this.ts.getSuccess("User created.");
          return fromAuthActions.authAddNewRegisteredUserToDbSuccess();
        },
        (rej) => {
          this.ts.getError("Error occured adding user.");
          return fromAuthActions.authAddNewRegisteredUserToDbFail();
        });

      }));
  });

  userLoggedout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAuthActions.authLogoutSuccess),
      switchMap((options) => {
        const redirect = options.redirect;
        const urlSegs: string[] = [];
        if (redirect) {
          urlSegs.push("/", "auth");
        }
        if (options.showAlert) {
          this.ts.getSuccess("You are logged out.");
        }
        return [
          fromRouterActions.redirectWithUrl({url: urlSegs}),
          fromLsActions.clearVerifiedUserAction()
        ];
      }));
  });

  userLoggedInSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAuthActions.authLoginSuccess),
      switchMap((opts) => {
        let urlToRedirect: string[] = null;
        if (opts.redirect) {
          urlToRedirect = [];
          urlToRedirect.push("/");
        }
        if (opts.showAlert) {
          this.ts.getSuccess("You are logged in.", 4000, true);
        }
        return [
          fromRouterActions.redirectWithUrl({url: urlToRedirect}),
          fromLsActions.saveVerifiedUserAction({user: opts.verifiedUser})
        ];
      })
    );
  });

  /**
   * Does not auto redirect to /
   */
  autoLoginFromLocalStorage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAuthActions.authAutoLogin),
      map((opts) => {
        this.ts.getSuccess("Auto logging in...");
        const prop = new LoginSuccessActionProp(opts.user, false, false);
        return fromAuthActions.authLoginSuccess(prop);
      })
    );
  });

  resetPasswordByEmail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAuthActions.authResetPasswordStart),
      switchMap((data) => {
        const emailAddress: string = data.email;
        return firebase.auth().sendPasswordResetEmail(emailAddress).then(
          (res) => {
            return fromAuthActions.authResetPasswordSuccess({email: emailAddress});
          },
          (rej: FirebasePromiseError) => {
            return fromAuthActions.authResetPasswordFail({errorMsg: AuthUtils.getFirebaseErrorMsg(rej)})
          }
        )
      })
    );
  });

  resetPasswordByEmailSent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAuthActions.authResetPasswordSuccess),
      tap((data) => {
        this.ts.getSuccess("A email with password reset instructions has been sent to " + data.email);
      })
    )
  }, {dispatch: false});

}
