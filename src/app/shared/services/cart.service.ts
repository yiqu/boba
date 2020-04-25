import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/database';
import { DrinkOrder } from '../models/tea.models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // Users related URLs
  private BASE_CART_URL: string = "cart";

  cartItemsListFire: AngularFireList<DrinkOrder>;
  cartItemList$: Observable<DrinkOrder[]>;

  constructor(public firedb: AngularFireDatabase) {
    this.cartItemsListFire = this.firedb.list(this.BASE_CART_URL);
    this.cartItemList$ = this.getCartItemObs();
  }

  private getCartItemObs(): Observable<DrinkOrder[]> {
    return this.cartItemsListFire.snapshotChanges().pipe(
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

}
