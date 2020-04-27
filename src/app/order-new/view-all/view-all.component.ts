import { Component, OnInit, OnDestroy } from '@angular/core';
import { RestDataFireService } from '../../shared/services/fire-data.service';
import { CartService } from '../../shared/services/cart.service';
import { map, takeUntil } from 'rxjs/operators';
import { DrinkOrder } from '../../shared/models/tea.models';
import { Subject } from 'rxjs';
import * as _ from 'lodash';
import { User } from '../../shared/models/user.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-new-view-all',
  templateUrl: 'view-all.component.html',
  styleUrls: ['./view-all.component.css']
})
export class OrderNewViewAllComponent implements OnInit, OnDestroy {

  compDest$: Subject<any> = new Subject<any>();
  cartOrders: DrinkOrder[] = [];
  listOfUsers: User[] = [];
  loading: boolean = false;
  cartOrdersGrouped: DrinkOrder[] = [];

  constructor(public rdfs: RestDataFireService, public cs: CartService,
    public router: Router, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.cs.cartItemList$.pipe(
      takeUntil(this.compDest$),
      map((val: DrinkOrder[]) => {
        this.loading = true;
        this.cartOrders = [...val];
        this.listOfUsers = [];
        this.cartOrdersGrouped = [];
        return val;
      })
    ).subscribe(
      (res) => {
        this.loading = false;
        this.createGroupByUser();
      }
    );
  }

  createGroupByUser() {
    // group the orders by Users and put into a list
    const uniqOrdersbyUser: DrinkOrder[] = _.uniqBy(this.cartOrders, (order: DrinkOrder) => {
      return order.user.id;
    });

    // make the unique users list
    uniqOrdersbyUser.forEach((val: DrinkOrder) => {
      this.listOfUsers.push(val.user);
    });

    // loop through each unique user, distribute the orders to each user
    this.listOfUsers.forEach((user: User) => {
      let drinkOrderByUser: DrinkOrder = new DrinkOrder(null, new Date().getTime(), [], user);
      this.cartOrdersGrouped.push(drinkOrderByUser);

      this.cartOrders.forEach((o: DrinkOrder) => {
        if (o.user.id === user.id) {
          const i = this.cartOrdersGrouped.findIndex((val: DrinkOrder) => {
            return val.user.id === o.user.id;
          });
          this.cartOrdersGrouped[i].orders.push(o.orders[0]);
        }
      });
    });
  }

  onCheckoutClick() {
    if (this.cartOrders.length > 0) {
      this.router.navigate(['../', 'checkout'], {relativeTo: this.route});
    }
  }

  onAddAnother() {
    this.router.navigate(['../', 'new'], {relativeTo: this.route});
  }

  ngOnDestroy() {

  }
}
