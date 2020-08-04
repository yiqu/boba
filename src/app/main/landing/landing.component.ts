import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AppState } from 'src/app/redux-stores/global-store/app.reducer';
import { Store } from '@ngrx/store';
import { VerifiedUser } from 'src/app/shared/models/user.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthState } from 'src/app/redux-stores/auth/auth.models';
import { IUserInfoState } from 'src/app/redux-stores/user/user.model';

@Component({
  selector: 'app-m-landing',
  templateUrl: 'landing.component.html',
  styleUrls: ['./landing.component.css']
})

export class MainLandingComponent implements OnInit, OnDestroy {

  bgUrl: string = "assets/images/bg/store-front.png";
  homeBannerText: string = "Welcome to k.q's boba shop."
  homeBannerSub: string = "We are always working hard to " +
  "serve you the most delicious boba tea!";
  user: VerifiedUser;
  compDest$: Subject<any> = new Subject<any>();
  authLoading: boolean;

  constructor(public as: AuthService, public store: Store<AppState>) {
    this.store.select("userInfoProfile").pipe(
      takeUntil(this.compDest$)
    ).subscribe(
      (state: IUserInfoState) => {
        this.user = state.userInfo;
        this.authLoading = state.loading;
      }
    )
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.compDest$.next();
    this.compDest$.complete();
  }
}
