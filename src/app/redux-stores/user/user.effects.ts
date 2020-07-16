import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { tap, concatMap, switchMap, map } from 'rxjs/operators';
import * as UserActions from './user.actions';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import * as AuthUtils from '../../shared/utils/auth.utils';
import { ToasterService } from '../../shared/services/toastr.service';
import { FireUserProfile } from './user.model';
import { VerifiedUser } from '../../shared/models/user.model';

@Injectable()
export class UserInfoEffects {

  constructor(public actions$: Actions, public ts: ToasterService) {
  }

  updateProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.saveUserProfileStart),
      concatMap((data) => {
        const user: firebase.User = firebase.auth().currentUser;
        return user.updateProfile({
          displayName: data.info.displayName,
          photoURL: data.info.photoURL
        }).then(
          () => {
            this.ts.getSuccess("Profile updated.");
            return UserActions.getUserProfileStart();
          },
          (rej) => {
            return UserActions.saveUserProfileFailure({errorMsg: AuthUtils.getFirebaseErrorMsg(rej)})
          }
        )
      })
    );
  });

  updateProfileFailure$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.saveUserProfileFailure),
      tap((data) => {
        this.ts.getError(data.errorMsg);
      })
    );
  }, {dispatch: false});


  getUserFireProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.getUserProfileStart),
      map(() => {
        const user: firebase.User = firebase.auth().currentUser;
        if (user) {
          const u = (<VerifiedUser>user.toJSON());
          return UserActions.getUserProfileSuccess({fireProfile: u});
        }
        return UserActions.getUserProfileFailure({errorMsg: "User is not logged in."});
      })
    );
  });
}
