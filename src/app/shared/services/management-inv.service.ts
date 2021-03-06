import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, SnapshotAction, AngularFireObject } from '@angular/fire/database';
import { DrinkOrder, DrinkFavoriteItem } from '../models/tea.models';
import { Observable, forkJoin, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import * as _ from 'lodash';
import { database } from 'firebase/app';
import { DrinkItem, ToppingItem } from '../models/base.model';


@Injectable({
  providedIn: 'root'
})
export class ManagementInventoryService {

  // Users related URLs
  private BASE_SELECTIONS_URL: string = "selections/";
  private MILK_TEAS_URL: string = "teas";
  private FRUIT_TEAS_URL: string = "creative-mix";
  private YOGURT_TEAS_URL: string = "yogurt";
  private TOPPINGS_URL: string = "toppings";

  milkTeasListFire: AngularFireList<DrinkItem>;
  creativeMixTeasListFire: AngularFireList<DrinkItem>;
  yogurtTeasListFire: AngularFireList<DrinkItem>;
  toppingsListFire: AngularFireList<ToppingItem>;

  milkTeasList$: Observable<DrinkItem[]>;
  creativeMixTeasList$: Observable<DrinkItem[]>;
  yogurtTeasList$: Observable<DrinkItem[]>;
  toppingsList$: Observable<ToppingItem[]>;

  allDrinksList$: Observable<any>;

  constructor(public firedb: AngularFireDatabase) {
    this.milkTeasListFire = this.firedb.list(this.BASE_SELECTIONS_URL + this.MILK_TEAS_URL);
    this.creativeMixTeasListFire = this.firedb.list(this.BASE_SELECTIONS_URL + this.FRUIT_TEAS_URL);
    this.yogurtTeasListFire = this.firedb.list(this.BASE_SELECTIONS_URL + this.YOGURT_TEAS_URL);
    this.toppingsListFire = this.firedb.list(this.BASE_SELECTIONS_URL + this.TOPPINGS_URL);

    this.milkTeasList$ = this.getCartItemObs<DrinkItem>(this.milkTeasListFire);
    this.creativeMixTeasList$ = this.getCartItemObs<DrinkItem>(this.creativeMixTeasListFire);
    this.yogurtTeasList$ = this.getCartItemObs<DrinkItem>(this.yogurtTeasListFire);
    this.toppingsList$ = this.getCartItemObs<ToppingItem>(this.toppingsListFire);

    this.allDrinksList$ = combineLatest(
      this.milkTeasList$,
      this.creativeMixTeasList$,
      this.yogurtTeasList$,
      this.toppingsList$
    );
  }

  getFDB(): database.Database {
    return this.firedb.database;
  }

  private getCartItemObs<T>(fl:AngularFireList<T>): Observable<T[]> {
    return fl.snapshotChanges().pipe(
      map((changes) => this.addfireKey(changes)),
    );
  }

  getDrinkDetailObs(series: string, id: string): Observable<any> {
    let fireObj = this.firedb.object(this.BASE_SELECTIONS_URL + series + "/" + id);
    return fireObj.snapshotChanges().pipe(
      map((changes) => this.addFireKeySingle(changes)),
    );
  }

  getDrinkDetail(series: string, id: string): AngularFireObject<any> {
    return this.firedb.object(this.BASE_SELECTIONS_URL + series + "/" + id);
  }

  addFireKeySingle(c: SnapshotAction<any>) {
    return (
      {
        fireKey: c.payload.key,
        ...c.payload.val()
      }
    )
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

}
