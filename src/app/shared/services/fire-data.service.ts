import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { DrinkOrder } from '../models/tea.models';
import { OrderStatusType } from '../models/base.model';

@Injectable({
  providedIn: 'root'
})
export class RestDataFireService {

  private ORDER_BASE_URL: string = "/orders";
  private ORDER_OPEN_URL: string = "/open";
  private ORDER_CLOSED_URL: string = "/closed";

  openOrders$: Observable<DrinkOrder[]> = new BehaviorSubject<DrinkOrder[]>(null);
  closedOrders$: Observable<DrinkOrder[]> = new BehaviorSubject<DrinkOrder[]>(null);
  currentOrdersCount: number;

  constructor(public http: HttpClient, public firedb: AngularFireDatabase) {
    this.openOrders$ = this.getOrderStatusList(OrderStatusType.OPEN).snapshotChanges().pipe(
      map((changes) => this.addfireKey(changes)),
      map((val: DrinkOrder[]) => this.createDrinkOrders(val))
    );

    this.closedOrders$ = this.getOrderStatusList(OrderStatusType.CLOSED).snapshotChanges().pipe(
      map((changes) => this.addfireKey(changes)),
      map((val: DrinkOrder[]) => this.createDrinkOrders(val))
    );
  }

  getOrderStatusList(listType: OrderStatusType): AngularFireList<DrinkOrder> {
    let list$: AngularFireList<DrinkOrder>;
    switch (listType) {
      case OrderStatusType.OPEN: {
        list$ = this.firedb.list(this.ORDER_BASE_URL + this.ORDER_OPEN_URL);
        break;
      }
      case OrderStatusType.CLOSED: {
        list$ = this.firedb.list(this.ORDER_BASE_URL + this.ORDER_CLOSED_URL);
        break;
      }

    }
    return list$;
  }


  addfireKey(c: SnapshotAction<DrinkOrder>[]) {
    return c.map((c: SnapshotAction<DrinkOrder>) => {
      return (
        { fireKey: c.payload.key,
          ...c.payload.val()
        }
      )}
    );
  }

  createDrinkOrders(v: DrinkOrder[]): DrinkOrder[] {
    let res: DrinkOrder[] = [];
    v.forEach((val) => {
      res.push(new DrinkOrder(val.fireKey, +val.date, val.orders, val.user));
    })
    this.currentOrdersCount = v.length;
    return res;
  }




}
