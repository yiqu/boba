import { Component, OnInit, OnDestroy } from '@angular/core';
import { RestDataFireService } from '../../shared/services/fire-data.service';
import { CartService } from '../../shared/services/cart.service';
import { map, takeUntil } from 'rxjs/operators';
import { DrinkOrder } from '../../shared/models/tea.models';
import { Subject, of } from 'rxjs';
import * as _ from 'lodash';
import { User } from '../../shared/models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';


/**
 * Cart component
 *
 * Items in cart are fetched from Firebase "/cart" ref.
 * Each order from "/cart" ref consists of user, date, and ONE SINGLE order
 * To remove X item from cart, remove X item from the "/cart" ref.
 */
@Component({
  selector: 'app-order-new-view-all',
  templateUrl: 'view-all.component.html',
  styleUrls: ['./view-all.component.css']
})
export class OrderNewViewAllComponent implements OnInit, OnDestroy {

  compDest$: Subject<any> = new Subject<any>();
  cartOrders: DrinkOrder[] = [];
  listOfUsers: User[] = null
  //loading: boolean = false;
  cartOrdersGrouped: DrinkOrder[] = [];
  bgUrl: string = "assets/images/bg/long-bg-bears.png";

  constructor(public rdfs: RestDataFireService, public cs: CartService,
    public router: Router, public route: ActivatedRoute, public sbs: SnackbarService) {
  }

  ngOnInit() {
    this.cs.cartItemList$.pipe(
      takeUntil(this.compDest$)
    ).subscribe(
      (res: DrinkOrder[]) => {
        this.cartOrders = [...res];
        this.listOfUsers = [];
        this.cartOrdersGrouped = [];
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
      let drinkOrderByUser: DrinkOrder = new DrinkOrder(null, new Date().getTime(), [], user, []);
      this.cartOrdersGrouped.push(drinkOrderByUser);

      this.cartOrders.forEach((o: DrinkOrder) => {
        if (o.user.id === user.id) {
          const i = this.cartOrdersGrouped.findIndex((val: DrinkOrder) => {
            return val.user.id === o.user.id;
          });
          this.cartOrdersGrouped[i].orders.push(o.orders[0]);
          this.cartOrdersGrouped[i].groupedOrders.push(o);
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

  onOrderRemove(drinkOrder: DrinkOrder) {
    if (drinkOrder && drinkOrder.fireKey) {
      this.cs.cartItemsListFire.remove(drinkOrder.fireKey).then((val) => {
        this.sbs.openSnackBar("Item removed from cart.");
      },
      (err) => {
        this.sbs.openSnackBar("Server Error: something went wrong while removing this item. " + err['code']);
      })
    } else {
      this.sbs.openSnackBar("Error occured removing this item: Item does not exist anymore.");
    }

  }

  ngOnDestroy() {
    this.compDest$.next();
  }
}
