import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdBannerService } from '../shared/services/ad-banner.service';
import { AdItem } from '../shared/ad-banner/banner/ad.item';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-order-new',
  templateUrl: 'order-new.component.html',
  styleUrls: ['./order-new.component.css']
})

export class OrderNewComponent implements OnInit, OnDestroy {

  ads: AdItem[];
  bannerMsg: string = "first, you will not be able to add orders or checkout.";

  constructor(public abs: AdBannerService, public router: Router, public route: ActivatedRoute,
    public as: AuthService) {
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
  }

  ngOnDestroy() {

  }

  setupAds() {
    if (environment.adsOn) {
      this.ads = this.abs.getAds();
    }
  }
}
