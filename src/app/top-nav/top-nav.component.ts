import { Component, OnInit, EventEmitter, Output, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from '../shared/services/cart.service';
import { Subject, timer } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { headShakeAnimation, rotateAnimation, tadaAnimation } from 'angular-animations';
import { AuthService } from '../shared/services/auth.service';
import { VerifiedUser } from '../shared/models/user.model';
import { MenuItem } from '../shared/models/nav-item.model';
import { RestDataFireService } from '../shared/services/fire-data.service';

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
  cartItemsCount: number = 0;
  compDest$: Subject<any> = new Subject<any>();
  logoShakeState: boolean = false;
  leftNavMenuState: boolean = false;
  swingState: boolean = false;
  userMenuIcon: string; //account_circle
  currentUser: VerifiedUser;
  userMenuItems: MenuItem[] = [];
  accountBtnText: string;

  @Output()
  navToggle: EventEmitter<any> = new EventEmitter<any>();

  constructor(public router: Router, public route: ActivatedRoute,
    public cs: CartService, public as: AuthService, public rdf: RestDataFireService) {
      this.cs.cartItemList$.pipe(
        takeUntil(this.compDest$)
      )
      .subscribe((val) => {
        this.cartItemsCount = val ? val.length : 0;
      });

      this.as.currentUser$.pipe(
        takeUntil(this.compDest$)
      ).subscribe((val: VerifiedUser) => {
        if (val) {
          this.currentUser = val;
          this.accountBtnText = "My Account";
          this.userMenuIcon = "account_circle";
        } else {
          this.currentUser = null;
          this.accountBtnText = "Login";
          this.userMenuIcon = "perm_identity";
        }
        this.buildUserMenuItems();
      });
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
    this.as.signoutUser().then(
      (res) => {
        this.router.navigate(['/']);
      },
      (rej) => {

      }
    );
  }

  onMenuItemClick(item: MenuItem) {
    if (item.display === "My account") {
      this.router.navigate(['/', 'my-account']);
    } else if (item.display === "Sign out") {
      this.onSignoutClick();
    } else if (item.display === "Sign in") {
      this.onAuthClick();
    }
  }

  buildUserMenuItems() {
    this.userMenuItems = [];
    if (this.currentUser) {
      this.userMenuItems.push(
        new MenuItem("person", "My account"),
        new MenuItem("power_settings_new", "Sign out")
      );
    } else {
      this.userMenuItems.push(
        new MenuItem("record_voice_over", "Sign in")
      )
    }
  }

  ngOnDestroy() {
    this.compDest$.next();
  }
}
