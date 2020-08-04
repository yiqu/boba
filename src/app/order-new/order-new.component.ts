import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdBannerService } from '../shared/services/ad-banner.service';
import { AdItem } from '../shared/ad-banner/banner/ad.item';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { AppState } from '../redux-stores/global-store/app.reducer';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthState } from '../redux-stores/auth/auth.models';

@Component({
  selector: 'app-order-new',
  templateUrl: 'order-new.component.html',
  styleUrls: ['./order-new.component.css']
})

export class OrderNewComponent implements OnInit, OnDestroy {

  ads: AdItem[];
  bannerMsg: string = "first, you will not be able to add orders or checkout.";
  compDest$: Subject<any> = new Subject<any>();
  authLoading: boolean;

  constructor(public abs: AdBannerService, public router: Router, public route: ActivatedRoute,
    public as: AuthService, private store: Store<AppState>) {
  }

  getCurrentTime(): number {
    return new Date().getTime();
  }

  goToNew() {
    this.router.navigate(['new'],
      {
        queryParams: {date: this.getCurrentTime()},
        relativeTo: this.route
      }
    );
  }

  ngOnInit() {
    this.setupAds();
    this.store.select("appAuth").pipe(
      takeUntil(this.compDest$)
    ).subscribe(
      (state: AuthState) => {
        this.authLoading = state.loading;
      }
    )
  }

  ngOnDestroy() {
    this.compDest$.next();
    this.compDest$.complete();
  }

  setupAds() {
    if (environment.adsOn) {
      this.ads = this.abs.getAds();
    }
  }
}
