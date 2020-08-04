import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, combineLatest } from 'rxjs';
import { VerifiedUser } from '../../shared/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../redux-stores/global-store/app.reducer';
import { takeUntil } from 'rxjs/operators';
import { AuthState } from '../../redux-stores/auth/auth.models';
import { IUserInfoState, FireUserProfile } from '../../redux-stores/user/user.model';
import { AccountService } from '../../shared/services/account.service';
import { IsMobileService } from '../../shared/services/is-mobile.service';

@Component({
  selector: 'app-account-view',
  templateUrl: 'view.component.html',
  styleUrls: ['./view.component.css']
})
export class AccountViewComponent implements OnInit, OnDestroy {

  viewSubtext: string = "My account information";
  defaultAvartarImgSrc: string = "assets/banner/placeholder-logo.png";
  compDest$: Subject<any> = new Subject<any>();
  user: VerifiedUser & FireUserProfile;
  authLoading: boolean;
  loadingError: boolean;

  constructor(private store: Store<AppState>, public ims: IsMobileService, private us: AccountService) {

  }

  ngOnInit() {
    const userProfile$ = this.store.select("userInfoProfile");
    const authUserProfile$ = this.store.select("appAuth");
    combineLatest(userProfile$, authUserProfile$).pipe(
      takeUntil(this.compDest$)
    ).subscribe(
      ([userProfile, authUser]) => {
        this.displayUserProfile(userProfile, authUser);
      }
    );

    this.us.getUserProfile();
  }

  displayUserProfile(userProfile: IUserInfoState, authUser: AuthState) {
    if (userProfile.userInfo) {
      this.authLoading = userProfile.loading;
      this.user = userProfile.userInfo;
      this.loadingError = userProfile.error;
    }
    else if (authUser.verifiedUser) {
      this.authLoading = authUser.loading;
      this.user = authUser.verifiedUser;
      this.loadingError = authUser.error;
    }
  }

  ngOnDestroy() {
    this.compDest$.next();
    this.compDest$.complete();
  }
}
