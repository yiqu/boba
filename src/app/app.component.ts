import { Component, ChangeDetectorRef, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd,
  NavigationCancel, NavigationError } from '@angular/router';
import { CartService } from './shared/services/cart.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { RestDataFireService } from './shared/services/fire-data.service';
import * as firebase from 'firebase/app';
import 'firebase/analytics';
import { AuthService } from './shared/services/auth.service';
import { environment } from 'src/environments/environment';
import { AppState } from './redux-stores/global-store/app.reducer';
import { Store } from '@ngrx/store';
import { VerifiedUser } from './shared/models/user.model';
import * as AuthActions from './redux-stores/auth/auth.actions';
import { IsMobileService } from './shared/services/is-mobile.service';
import { IUserDBState } from './redux-stores/user/user.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const LOCAL_STORAGE_USER_KEY: string = "VERIFIED_USER";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {

  footerTitle: string = "@KQ 2020";
  myUrl: string = "https://yiqu.github.io/";
  stopListenToUserDB$: Subject<any> = new Subject<any>();
  userLoaded: boolean;


  @ViewChild("snav")
  sideNav: MatSidenav;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(public router: Router, public route: ActivatedRoute,
    public cs: CartService, public changeDetectorRef: ChangeDetectorRef, public media: MediaMatcher,
    public fds: RestDataFireService, public as: AuthService, public ims: IsMobileService,
    private store: Store<AppState>) {
      this.setMobileDetection();

      this.store.select("userDB").pipe(
        takeUntil(this.stopListenToUserDB$)
      ).subscribe(
        (state: IUserDBState) => {
          this.userLoaded = state.loaded;
          if (state.loaded) {
            this.stopListenToUserDB$.next();
            this.stopListenToUserDB$.complete();
          }
        }
      )

  }

  ngOnInit() {
    const u: VerifiedUser = this.getUserFromLocalStorage();
    if (u) {
      this.store.dispatch(AuthActions.authAutoLogin({user: u}))
    }
    if (environment.gAnalytics) {
      firebase.analytics();
    }
  }

  /**
   * Detect if deive is mobile size, then re-run detection change
   */
  setMobileDetection() {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.ims.mediaQList = this.mobileQuery;
  }

  onTopNavMenuClick() {
    if (this.sideNav) {
      this.sideNav.toggle();
    }
  }

  onNavClose() {
    if (this.sideNav) {
      this.sideNav.close();
    }
  }

  getUserFromLocalStorage(): VerifiedUser | null{
    const localStorageUser: any = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY));
    if (!localStorageUser) {
      return null;
    }
    console.info("Local Storage: User Present");
    return localStorageUser;
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
