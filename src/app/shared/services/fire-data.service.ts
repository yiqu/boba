import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { DrinkOrder } from '../models/tea.models';
import { OrderStatusType, DrinkSeries, DrinkItem, BaseItem } from '../models/base.model';
import { User } from '../models/user.model';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestDataFireService {

  mobileQuery: MediaQueryList;

  // ORDERS related URLs
  private ORDER_BASE_URL: string = "orders";
  private ORDER_OPEN_URL: string = "/open";
  private ORDER_CLOSED_URL: string = "/closed";

  // SELECTIONS related URLs
  private SELECTIONS_BASE_URL: string = "selections";
  private SELECTIONS_MILK_TEAS_URL: string = "/teas";
  private SELECTIONS_CREATIVE_MIX_URL: string = "/creative-mix";
  private SELECTIONS_YOGURT_URL: string = "/yogurt";
  private SELECTIONS_ICE_LEVEL_URL: string = "/ice-level";
  private SELECTIONS_SUGAR_LEVEL_URL: string = "/sugar-level";
  private SELECTIONS_SIZE_LEVEL_URL: string = "/size";
  private SELECTIONS_TOPPINGS_URL: string = "/toppings";

  // Favorite
  private FAV_BASE_URL: string = "favorites";
  // Cart
  private CART_BASE_URL: string = "cart";

  currentOrdersCount: number;

  openOrders$: Observable<DrinkOrder[]> = new BehaviorSubject<DrinkOrder[]>(null);
  closedOrders$: Observable<DrinkOrder[]> = new BehaviorSubject<DrinkOrder[]>(null);

  openOrdersFDB: AngularFireList<DrinkOrder>;
  closedOrdersFDB: AngularFireList<DrinkOrder>;

  ordersInCartFList: AngularFireList<DrinkOrder>;

  constructor(public http: HttpClient, public firedb: AngularFireDatabase) {
    // create fire lists
    this.ordersInCartFList = this.firedb.list<DrinkOrder>(this.CART_BASE_URL);
    this.openOrdersFDB = this.getOrderStatusList(OrderStatusType.OPEN);
    this.closedOrdersFDB = this.getOrderStatusList(OrderStatusType.CLOSED);

    // create obs
    this.openOrders$ = this.openOrdersFDB.snapshotChanges().pipe(
      map((changes) => this.addfireKey(changes)),
      map((val: DrinkOrder[]) => this.createDrinkOrders(val)),
      map((val: DrinkOrder[]) => {
        return val.reverse()
      })
    );

    this.closedOrders$ = this.closedOrdersFDB.snapshotChanges().pipe(
      map((changes) => this.addfireKey(changes)),
      map((val: DrinkOrder[]) => this.createDrinkOrders(val)),
      map((val: DrinkOrder[]) => {
        return val.reverse()
      })
    );
  }

  getOrderStatusList(listType: OrderStatusType): AngularFireList<DrinkOrder> {
    let list$: AngularFireList<DrinkOrder>;
    switch (listType) {
      case OrderStatusType.OPEN: {
        list$ = this.firedb.list(this.ORDER_BASE_URL + this.ORDER_OPEN_URL, (ref)=> {return ref.orderByChild("date")});
        break;
      }
      case OrderStatusType.CLOSED: {
        list$ = this.firedb.list(this.ORDER_BASE_URL + this.ORDER_CLOSED_URL, (ref)=> {return ref.orderByChild("date")});
        break;
      }

    }
    return list$;
  }

  getDrinksBySeriesList(series: DrinkSeries): AngularFireList<DrinkItem> {
    let list$: AngularFireList<DrinkItem>;
    switch (series) {
      case DrinkSeries.MILK_TEA: {
        list$ = this.firedb.list(this.SELECTIONS_BASE_URL + this.SELECTIONS_MILK_TEAS_URL);
        break;
      }
      case DrinkSeries.FRUIT_TEA: {
        list$ = this.firedb.list(this.SELECTIONS_BASE_URL + this.SELECTIONS_CREATIVE_MIX_URL);
        break;
      }
      case DrinkSeries.YOGURT: {
        list$ = this.firedb.list(this.SELECTIONS_BASE_URL + this.SELECTIONS_YOGURT_URL);
        break;
      }
    }
    return list$;
  }

  getDrinksBySeriesObs(series: DrinkSeries): Observable<DrinkItem[]>  {
    if (series) {
      return this.getDrinksBySeriesList(series).snapshotChanges().pipe(
        map((changes) => this.addfireKey(changes))
      );
    }
    return of([]);
  }

  getDrinksBySettingOption(settingOption: string): AngularFireList<DrinkItem> {
    let list$: AngularFireList<DrinkItem>;
    switch (settingOption) {
      case "ice-level": {
        list$ = this.firedb.list(this.SELECTIONS_BASE_URL + this.SELECTIONS_ICE_LEVEL_URL);
        break;
      }
      case "sugar-level": {
        list$ = this.firedb.list(this.SELECTIONS_BASE_URL + this.SELECTIONS_SUGAR_LEVEL_URL);
        break;
      }
      case "size": {
        list$ = this.firedb.list(this.SELECTIONS_BASE_URL + this.SELECTIONS_SIZE_LEVEL_URL);
        break;
      }
    }
    return list$;
  }

  getDrinksBySettingOptionObs(settingOption: string): Observable<DrinkItem[]>  {
    if (settingOption) {
      return this.getDrinksBySettingOption(settingOption).snapshotChanges().pipe(
        map((changes) => this.addfireKey(changes))
      );
    }
    return of([]);
  }

  getDrinkToppingObs(): Observable<DrinkItem[]> {
    const toppings: AngularFireList<BaseItem> =
      this.firedb.list(this.SELECTIONS_BASE_URL + this.SELECTIONS_TOPPINGS_URL);

    return toppings.snapshotChanges().pipe(
      map((changes) => this.addfireKey(changes))
    );
  }

  getCartOrders(): AngularFireList<DrinkOrder> {
    return this.ordersInCartFList;
  }

  getDataObjValue(objName: string): Observable<any> {
    return this.firedb.object(objName).valueChanges();
  }

  getDataObjSnapshot(objName: string): Observable<any> {
    return this.firedb.object(objName).snapshotChanges();
  }

  updateData(objName: string, data: any) {
    const itemRef = this.firedb.object(objName);
    return from(itemRef.update(data));
  }

  getDatAsList(objName: string): Observable<any[]> {
    let list$: AngularFireList<any>;
    list$ = this.firedb.list(objName);
    return list$.snapshotChanges().pipe(
      map((changes) => this.addfireKey(changes))
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

  createDrinkOrders(v: DrinkOrder[]): DrinkOrder[] {
    let res: DrinkOrder[] = [];
    v.forEach((val) => {
      res.push(new DrinkOrder(val.fireKey, +val.date, val.orders, val.user));
    })
    this.currentOrdersCount = v.length;
    return res;
  }




}
