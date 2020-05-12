import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { NavHeaderList, NavHeader, NavHeaderLink } from '../shared/models/nav-item.model';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-side-nav',
  templateUrl: 'side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit, OnDestroy {

  headerList: NavHeaderList[] = [];
  navTitle: string = "Home";
  compDest$: Subject<any> = new Subject<any>();

  @Output()
  navClose: EventEmitter<any> = new EventEmitter<any>();

  constructor(public router: Router, public as: AuthService) {
    this.as.currentUser$.pipe(
      takeUntil(this.compDest$)
    )
    .subscribe((u) => {
      this.headerList = [];
      if (!u) {
        this.headerList.push(
          new NavHeaderList(new NavHeader("Login"), [
            new NavHeaderLink("Login", "account_circle", ["/", "auth", "signin"]),
          ]),
        )
      }
      this.createAllOptions();
    });
  }

  createAllOptions() {
    this.headerList.push(
      new NavHeaderList(new NavHeader("Orders"), [
        new NavHeaderLink("New Order", "add_shopping_cart", ["/", "new-order", "new"]),
        new NavHeaderLink("My Cart", "shopping_cart", ["/", "new-order", "all"]),
        new NavHeaderLink("Open", "alarm", ["/", "home", "open-orders"]),
        new NavHeaderLink("Closed", "done_all", ["/", "home", "completed-orders"]),
      ]),
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
    );
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

  ngOnDestroy() {
    this.compDest$.next();
  }
}

