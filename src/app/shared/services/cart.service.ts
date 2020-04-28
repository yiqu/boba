import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/database';
import { DrinkOrder, DrinkFavoriteItem } from '../models/tea.models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import * as _ from 'lodash';
import { database } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  // Users related URLs
  private BASE_CART_URL: string = "cart";
  private BASE_FAV_URL: string = "favorites"

  cartItemsListFire: AngularFireList<DrinkOrder>;
  cartItemList$: Observable<DrinkOrder[]>;
  favItemsListFDB: AngularFireList<DrinkFavoriteItem>;
  favItemsList$: Observable<DrinkFavoriteItem[]>;

  constructor(public firedb: AngularFireDatabase) {
    this.cartItemsListFire = this.firedb.list(this.BASE_CART_URL);
    this.cartItemList$ = this.getCartItemObs<DrinkOrder>();

    this.favItemsListFDB = this.firedb.list(this.BASE_FAV_URL);
    this.favItemsList$ = this.getFavItemObs<DrinkFavoriteItem>();
  }

  getFDB(): database.Database {
    return this.firedb.database;
  }

  private getCartItemObs<T>(): Observable<T[]> {
    return this.cartItemsListFire.snapshotChanges().pipe(
      map((changes) => this.addfireKey(changes)),
    );
  }

  private getFavItemObs<T>(): Observable<T[]> {
    return this.favItemsListFDB.snapshotChanges().pipe(
      map((changes) => this.addfireKey(changes)),
    );
  }

  addfireKey(c: SnapshotAction<any>[]) {
    return c.map((c: SnapshotAction<any>) => {
      return (
        { fireKey: c.payload.key,
          ...c.payload.val()
        }
      )}
    );
  }

  getFavorites(): AngularFireList<any> {
    return null
  }

  /**
   * Returns Drink orders grouped by unique user ID
   */
  createGroupByUser(cartOrders: DrinkOrder[]): DrinkOrder[] {
    let cartOrdersGrouped: DrinkOrder[] = [];
    const users: User[] = [];
    const timeStamp: number = new Date().getTime();

    // group the orders by Users and put into a list
    const uniqOrdersbyUser: DrinkOrder[] = _.uniqBy(cartOrders, (order: DrinkOrder) => {
      return order.user.id;
    });

    // make the unique users list
    uniqOrdersbyUser.forEach((val: DrinkOrder) => {
      users.push(val.user);
    });

    // loop through each unique user, distribute the orders to each user
    users.forEach((user: User) => {
      let drinkOrderByUser: DrinkOrder = new DrinkOrder(null, timeStamp, [], user);
      cartOrdersGrouped.push(drinkOrderByUser);

      cartOrders.forEach((o: DrinkOrder) => {
        if (o.user.id === user.id) {
          const i = cartOrdersGrouped.findIndex((val: DrinkOrder) => {
            return val.user.id === o.user.id;
          });
          cartOrdersGrouped[i].orders.push(o.orders[0]);
        }
      });
    });

    return cartOrdersGrouped;
  }

}
