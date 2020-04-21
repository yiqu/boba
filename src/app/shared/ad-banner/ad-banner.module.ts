import { NgModule } from '@angular/core';

import { AdBannerComponent } from './ad-banner.component';
import { AdBannerDirective } from './banner/ad.dir';
import { NewDrinkAdComponent } from './banner/new-drink.component';
import { SummerDealAdComponent } from './banner/summer.component';

@NgModule({
  imports: [],

  exports: [
    AdBannerComponent
  ],

  declarations: [
    AdBannerComponent,
    AdBannerDirective,
    SummerDealAdComponent,
    NewDrinkAdComponent
  ],

  providers: [],
})
export class AdBannerModule { }
