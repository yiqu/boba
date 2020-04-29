import { Component, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from './shared/services/cart.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  footerTitle: string = "@KQ 2020";
  myUrl: string = "https://yiqu.github.io/";

  @ViewChild("snav")
  sideNav: MatSidenav;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(public router: Router, public route: ActivatedRoute,
    public cs: CartService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {

      /**
       * Detect if deive is mobile size, then re-run detection change
       */
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
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
