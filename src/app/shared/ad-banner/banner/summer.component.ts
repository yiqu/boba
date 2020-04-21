import { Component, Input }  from '@angular/core';
import { AdComponent }       from './ad.component';
import { AdBannerItemData } from '../../services/ad-banner.service';

@Component({
  template: `
    <div class="ad-banner-bg-img summer-banner">
      <div class="icon-img-parent">
        <img [src]="data.imgUrlSrc" class="img-h-100" alt="drink icon">
      </div>
      <div class="summer-banner-text comf">
        {{data.description}}
      </div>
    </div>
  `,
  styleUrls: ['../ad-banner.component.css']
})
export class SummerDealAdComponent implements AdComponent {
  @Input() data: AdBannerItemData;
}
