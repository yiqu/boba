import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdBannerService } from '../shared/services/ad-banner.service';
import { AdItem } from '../shared/ad-banner/banner/ad.item';

@Component({
  selector: 'app-order-new',
  templateUrl: 'order-new.component.html',
  styleUrls: ['./order-new.component.css']
})

export class OrderNewComponent implements OnInit, OnDestroy {

  ads: AdItem[];

  constructor(public abs: AdBannerService) {

  }

  ngOnInit() {
    this.ads = this.abs.getAds();
  }

  ngOnDestroy() {

  }
}
