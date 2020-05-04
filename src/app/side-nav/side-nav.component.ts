import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NavHeaderList, NavHeader, NavHeaderLink } from '../shared/models/nav-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: 'side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  headerList: NavHeaderList[] = [];
  navTitle: string = "BobaShop";

  @Output()
  navClose: EventEmitter<any> = new EventEmitter<any>();

  constructor(public router: Router) {
    this.headerList.push(
      new NavHeaderList(new NavHeader("Management"), [
        new NavHeaderLink("Inventory", "assignment", ["/", "management", "inventory"]),
        new NavHeaderLink("Users", "people", ["/", "management", "users"]),
        new NavHeaderLink("Order archives", "poll", ["/", "management", "archives"])
      ]),
      new NavHeaderList(new NavHeader("Performance"), [
        new NavHeaderLink("Metrics", "trending_up", ["/", "performance", "metrics"])
      ]),
      new NavHeaderList(new NavHeader("Help & Settings"), [
        new NavHeaderLink("My Account", "account_circle", ["/", "my-account"]),
        new NavHeaderLink("Customer Service", "device_unknown", ["/", "help", "customer-service"])
      ])
    )
  }

  ngOnInit() {

  }

  onNavClose() {
    this.navClose.emit(true);
  }

  onNavItemClick() {
    this.navClose.emit(true);
  }

  onTitleClick() {
    this.router.navigate(['/']);
    this.navClose.emit(true);
  }
}

