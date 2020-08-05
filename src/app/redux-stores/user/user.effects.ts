import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { tap, concatMap, switchMap, map } from 'rxjs/operators';
import * as UserActions from './user.actions';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import * as AuthUtils from '../../shared/utils/auth.utils';
import { ToasterService } from '../../shared/services/toastr.service';
import { FireUserProfile, IUserInfo, UserInfo } from './user.model';
import { VerifiedUser } from '../../shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { FirebasePromiseError } from 'src/app/shared/models/firebase.model';

@Injectable()
export class UserInfoEffects {

  constructor(public actions$: Actions, public ts: ToasterService,
    private us: UserService) {
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
            return UserActions.saveUserProfileSuccess({info: data.info, uid: user.uid});
          },
          (rej) => {
            return UserActions.saveUserProfileFailure({errorMsg: AuthUtils.getFirebaseErrorMsg(rej)})
          }
        )
      })
    );
  });

  updateProfileSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.saveUserProfileSuccess),
      switchMap((data) => {
        const info: IUserInfo = data.info;
        this.ts.getSuccess("Profile updated for " + info.displayName);
        return [
          UserActions.getUserProfileStart(),
          UserActions.updateUserDBProfileEntryStart({userProfile: info, uid: data.uid})
        ];
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

  getUserDatabaseEntry$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.getUserDBEntryStart),
      switchMap((data) => {
        const uid: string = data.uid ? data.uid : "-";
        return this.us.getUserDBEntryById(uid).get().then(
          (res) => {
            if (res.exists) {
              const user: VerifiedUser = res.data() as VerifiedUser;
              return UserActions.getUserDBEntrySuccess({user: user});
            } else {
              return UserActions.getUserDBEntrySuccess({user: null});
            }
          },
          (rej: FirebasePromiseError) => {
            console.log(rej)
            return UserActions.getUserDBEntryFailure({errorMsg: AuthUtils.getFirebaseErrorMsg(rej)});
          }
        );
      })
    );
  });

  updateUserDBProfileStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.updateUserDBProfileEntryStart),
      switchMap((info) => {
        const userInfo: IUserInfo = info.userProfile;
        const uid: string = info.uid;
        const newInfo: UserInfo = new UserInfo(userInfo.displayName, userInfo.photoURL);
        return this.us.getUserDBEntryById(uid).update({...newInfo}).then(
          (res) => {
            console.log(res)
            return UserActions.updateUserDBProfileSuccess({userProfile: newInfo});
          },
          (rej: FirebasePromiseError) => {
            return UserActions.updateUserDBProfileEntryFailure({errorMsg: AuthUtils.getFirebaseErrorMsg(rej)});
          }
        )
      })
    );
  });

  updateUserDBProfileFailure$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.updateUserDBProfileEntryFailure),
      map((data) => {
        this.ts.getError("Could not update your DB entry. " + data.errorMsg);
      })
    );
  }, {dispatch: false});

}
