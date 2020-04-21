import { Component, OnInit, OnDestroy, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { AdItem } from './banner/ad.item';
import { AdBannerDirective } from './banner/ad.dir';
import { AdComponent } from './banner/ad.component';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-shared-ad-banner',
  templateUrl: 'ad-banner.component.html',
  styleUrls: ['./ad-banner.component.css']
})
export class AdBannerComponent implements OnInit, OnDestroy {

  @Input()
  ads: AdItem[] = [];

  @ViewChild(AdBannerDirective, {static: true})
  adHost: AdBannerDirective;

  currentAdIndex = -1;
  compDest$: Subject<any> = new Subject<any>();

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    this.loadComponent();
    this.getAds();
  }

  loadComponent() {
    this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;

    if (this.currentAdIndex > -1) {
      const adItem = this.ads[this.currentAdIndex];

      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);

      const viewContainerRef = this.adHost.viewContainerRef;
      viewContainerRef.clear();

      const componentRef = viewContainerRef.createComponent(componentFactory);
      (<AdComponent>componentRef.instance).data = adItem.data;
    }
  }

  getAds() {
    interval(environment.adBannerInterval).pipe(
      takeUntil(this.compDest$)
    )
    .subscribe((val) => {
      console.log(val)
      this.loadComponent();
    })
  }

  ngOnDestroy() {
    this.compDest$.next();
  }
}
