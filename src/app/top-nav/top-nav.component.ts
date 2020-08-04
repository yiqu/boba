import { Component, OnInit, EventEmitter, Output, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from '../shared/services/cart.service';
import { Subject, timer } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { headShakeAnimation, rotateAnimation, tadaAnimation } from 'angular-animations';
import { AuthService } from '../shared/services/auth.service';
import { VerifiedUser } from '../shared/models/user.model';
import { MenuItem } from '../shared/models/nav-item.model';
import { Store } from '@ngrx/store';
import { AppState } from '../redux-stores/global-store/app.reducer';
import { IUserInfoState } from '../redux-stores/user/user.model';
import * as AuthUtils from '../shared/utils/auth.utils';

const defaultProfileImg: string = "assets/user/default-user.png";

@Component({
  selector: 'app-top-nav',
  templateUrl: 'top-nav.component.html',
  styleUrls: ['./top-nav.component.css'],
  animations: [
    headShakeAnimation(),
    rotateAnimation(),
    tadaAnimation()
  ]
})
export class TopNavComponent implements OnInit, OnDestroy, AfterViewInit {

  headerTitle: string = "BobaShop";
  cartItemsCount: string = "0";
  compDest$: Subject<any> = new Subject<any>();
  logoShakeState: boolean = false;
  leftNavMenuState: boolean = false;
  swingState: boolean = false;
  userMenuIcon: string; //account_circle
  currentUser: VerifiedUser;
  userMenuItems: MenuItem[] = [];
  loading: boolean;
  avartarImgSrc: string = defaultProfileImg;

  @Output()
  navToggle: EventEmitter<any> = new EventEmitter<any>();

  constructor(public router: Router, public route: ActivatedRoute,
    public cs: CartService, public as: AuthService, private store: Store<AppState>) {

      // this.cs.cartItemList$.pipe(
      //   takeUntil(this.compDest$)
      // )
      // .subscribe((val) => {
      //   this.cartItemsCount = val ? (val.length + "") : "0";
      // });

      this.loading = true;
      this.store.select("userInfoProfile").pipe(
        takeUntil(this.compDest$)
      ).subscribe(
        (state: IUserInfoState) => {
          this.loading = state.loading;
          this.setUserProfileImg(state.userInfo);
          this.buildUserMenuItems(state.userInfo);
          this.userMenuIcon = state.userInfo ? "account_circle" : "perm_identity";
        }
      )
  }

  ngOnInit() {
    this.animateLogoOnStart();
  }

  ngAfterViewInit() {
  }

  onLogoClick() {
    this.logoShakeState = !this.logoShakeState;
  }

  onCartClick() {
    this.router.navigate(['new-order', 'all']);
  }

  onMenuClick() {
    this.leftNavMenuState = !this.leftNavMenuState;
    this.navToggle.emit(true);
  }

  animateLogoOnStart() {
    const logoAnimateTimer = timer(600);
    logoAnimateTimer.pipe(
      take(1)
    ).subscribe((val) => {
      this.swingState = true;
    })
  }

  onAuthClick() {
    this.router.navigate(['auth']);
  }

  onSignoutClick() {
    this.as.signoutUser();
  }

  onMenuItemClick(item: MenuItem) {
    if (item.id === "account") {
      this.router.navigate(['/', 'my-account']);
    } else if (item.id === "signout") {
      this.onSignoutClick();
    } else if (item.id === "signin") {
      this.onAuthClick();
    }
  }

  buildUserMenuItems(u: VerifiedUser): void {
    this.userMenuItems = [];
    if (u) {
      const displayName = u.displayName ? u.displayName : AuthUtils.createInitAlias(u.email);
      this.userMenuItems.push(
        new MenuItem(null, "Signed in as " + (displayName), null, true),
        new MenuItem("account_circle", "My profile", "account"),
        new MenuItem("forward", "Sign Out", "signout")
      )
    } else {
      this.userMenuItems.push(
        new MenuItem("record_voice_over", "Sign in", "signin"),
      )
    }
  }

  setUserProfileImg(u: VerifiedUser) {
    if (u) {
      this.avartarImgSrc = u.photoURL;
    } else {
      this.avartarImgSrc = defaultProfileImg;
    }
  }

  ngOnDestroy() {
    this.compDest$.next();
    this.compDest$.complete();
  }
}
