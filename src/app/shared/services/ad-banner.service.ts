import { Injectable } from '@angular/core';
import { AdItem } from '../ad-banner/banner/ad.item';
import { NewDrinkAdComponent } from '../ad-banner/banner/new-drink.component';
import { SummerDealAdComponent } from '../ad-banner/banner/summer.component';

@Injectable({
  providedIn: 'root'
})
export class AdBannerService {
  constructor() {

  }

  getAds(): AdItem[] {
    let ads: AdItem[] = [];
    ads.push(new AdItem(NewDrinkAdComponent,
      new AdBannerItemData("assets/images/main/icons/yogurt-tea-icon.png", "New ! Yogurt series has arrived !")));

    ads.push(new AdItem(SummerDealAdComponent,
      new AdBannerItemData("assets/images/main/icons/fruit-tea-icon.png", "Beat the summer heat with a tea !")));

    return ads;
  }

}


export class AdBannerItemData {
  constructor(public imgUrlSrc: string, public description: string) {
  }
}
