import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd,
  NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-shared-loading',
  templateUrl: 'loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit, OnChanges {

  @Input()
  wholePage: boolean;

  loading: boolean = true;
  logoShakeState: boolean = false;
  parentClass: string;

  constructor(public router: Router) {
    // this.router.events.subscribe((event: Event) => {
    //   switch (true) {
    //     case event instanceof NavigationStart: {
    //       this.loading = true;
    //       break;
    //     }

    //     case event instanceof NavigationEnd:
    //     case event instanceof NavigationCancel:
    //     case event instanceof NavigationError: {
    //       this.loading = false;
    //       break;
    //     }
    //     default: {
    //       break;
    //     }
    //   }
    // });
  }

  ngOnChanges(c) {
    if (this.wholePage) {
      this.parentClass = "whole-page loading-container"
    } else {
      this.parentClass = "container loading-container mt-5";
    }
  }

  ngOnInit() {

  }
}
