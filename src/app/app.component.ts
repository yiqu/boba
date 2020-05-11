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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {

  footerTitle: string = "@KQ 2020";
  myUrl: string = "https://yiqu.github.io/";

  @ViewChild("snav")
  sideNav: MatSidenav;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(public router: Router, public route: ActivatedRoute,
    public cs: CartService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    public fds: RestDataFireService, public as: AuthService) {

      /**
       * Detect if deive is mobile size, then re-run detection change
       */
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
      this.fds.mobileQuery = this.mobileQuery;

  }

  ngOnInit() {
    if (environment.gAnalytics) {
      firebase.analytics();
    }
  }

  onCartClick() {
    this.router.navigate(['new-order', 'all']);
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

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
