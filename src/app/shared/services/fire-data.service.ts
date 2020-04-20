import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { DrinkOrder } from '../models/tea.models';

@Injectable({
  providedIn: 'root'
})
export class RestDataFireService {

  private ORDER_BASE_URL: string = "/orders";
  private ORDER_OPEN_URL: string = "/open";
  private ORDER_CLOSED_URL: string = "/closed";

  openOrders: AngularFireList<DrinkOrder>;
  closedOrders: AngularFireList<DrinkOrder>;
  openOrders$: Observable<DrinkOrder[]> = new BehaviorSubject<DrinkOrder[]>(null);
  openOrdersCount: number = null;
  closedOrdersCount: number = null;

  constructor(public http: HttpClient, public firedb: AngularFireDatabase) {

    this.openOrders = this.firedb.list(this.ORDER_BASE_URL + this.ORDER_OPEN_URL);
    this.closedOrders = this.firedb.list(this.ORDER_BASE_URL + this.ORDER_CLOSED_URL);

    this.openOrders$ = this.openOrders.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((c: SnapshotAction<DrinkOrder>) => {
          return (
            { fireKey: c.payload.key,
              ...c.payload.val()
            }
          )}
        );
      }),
      map((val: DrinkOrder[]) => {
        let res: DrinkOrder[] = [];
        val.forEach((val) => {
          res.push(new DrinkOrder(val.fireKey, +val.date, val.orders, val.user));
        })
        this.openOrdersCount = val.length;
        console.log(res)
        return res;
      }))
  }

}
