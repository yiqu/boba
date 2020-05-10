import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { NavItem } from '../shared/models/nav-item.model';
import { Router, ActivatedRoute, ParamMap, NavigationStart, NavigationEnd, Data } from '@angular/router';
import { RestDataFireService } from '../shared/services/fire-data.service';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AdBannerService } from '../shared/services/ad-banner.service';
import { AdItem } from '../shared/ad-banner/banner/ad.item';
import { environment } from 'src/environments/environment';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: 'main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  tabLinks: NavItem[] = [];
  activeLink: NavItem;
  compDest$: Subject<any> = new Subject<any>();
  ads: AdItem[];

  constructor(public router: Router, public route: ActivatedRoute,
    public fds: RestDataFireService, public abs: AdBannerService,
    private ngZone: NgZone, public as: AuthService) {
    this.tabLinks.push(
      new NavItem('open', "Working", "open-orders"),
      new NavItem('closed', "Delivered", "completed-orders")
    );

    this.route.url.subscribe((val) => {
      this.setActiveTab();
    });

    this.router.events.pipe(
      filter((val) => {
        return (val instanceof NavigationEnd);
      }),
      takeUntil(this.compDest$)
    )
    .subscribe((val) => {
      this.setActiveTab();
    });
  }

  ngOnInit() {
    this.setActiveTab();
    this.setupAds();
  }

  onNewOrder() {
    //TODO temp fix due to resolver
    // this.ngZone.run(
    //   () => {
    //     this.router.navigate(['../', 'new-order'], {relativeTo: this.route})
    // });
    this.router.navigate(['../', 'new-order'], {relativeTo: this.route});
  }

  setActiveTab() {
    const segs = this.router.url.split("/");
    const last: string = segs[segs.length-1];
    const current: number = this.tabLinks.findIndex((link: NavItem) => {
      return last.includes(link.url);
    });

    if (current > -1) {
      this.activeLink = this.tabLinks[current];
    } else {
      this.activeLink = null;
    }
  }

  setupAds() {
    if (environment.adsOn) {
      this.ads = this.abs.getAds();
    }
  }

  ngOnDestroy() {
    this.compDest$.next();
  }
}
