import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { DrinkOrder } from '../models/tea.models';
import { OrderStatusType, DrinkSeries, DrinkItem } from '../models/base.model';

@Injectable({
  providedIn: 'root'
})
export class RestDataFireService {

  // ORDERS related URLs
  private ORDER_BASE_URL: string = "/orders";
  private ORDER_OPEN_URL: string = "/open";
  private ORDER_CLOSED_URL: string = "/closed";

  // SELECTIONS related URLs
  private SELECTIONS_BASE_URL: string = "/selections";
  private SELECTIONS_MILK_TEAS_URL: string = "/teas";
  private SELECTIONS_CREATIVE_MIX_URL: string = "/creative-mix";
  private SELECTIONS_YOGURT_URL: string = "/yogurt";
  private SELECTIONS_ICE_LEVEL_URL: string = "/ice-level";
  private SELECTIONS_SUGAR_LEVEL_URL: string = "/sugar-level";
  private SELECTIONS_SIZE_LEVEL_URL: string = "/size";


  openOrders$: Observable<DrinkOrder[]> = new BehaviorSubject<DrinkOrder[]>(null);
  closedOrders$: Observable<DrinkOrder[]> = new BehaviorSubject<DrinkOrder[]>(null);
  currentOrdersCount: number;

  drinksBySeries$: Observable<DrinkItem[]> = new BehaviorSubject<DrinkItem[]>(null);

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
