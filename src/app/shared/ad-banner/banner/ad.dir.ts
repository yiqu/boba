import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ad-banner-host]',
})
export class AdBannerDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
