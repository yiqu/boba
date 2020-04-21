import { Type } from '@angular/core';
import { AdBannerItemData } from '../../services/ad-banner.service';

export class AdItem {
  constructor(public component: Type<any>, public data: AdBannerItemData) {}
}
