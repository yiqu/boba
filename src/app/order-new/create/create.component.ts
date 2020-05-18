import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RestDataFireService } from '../../shared/services/fire-data.service';
import { DrinkOrder, DrinkOrderDetail, DrinkIceLevel, DrinkSugarLevel,
  DrinkSize, DrinkType, DrinkTopping, DrinkFavoriteItem } from '../../shared/models/tea.models';
import { User, VerifiedUser } from '../../shared/models/user.model';
import { ActivatedRoute, Params } from '@angular/router';
import { OrderFormService } from '../..//shared/order-form/order-form.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { takeUntil, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-order-new-create',
  templateUrl: 'create.component.html',
  styleUrls: ['./create.component.css']
})
export class OrderNewCreateComponent implements OnInit, OnDestroy {

  drinkOrder: DrinkOrderDetail;
  favItems: DrinkFavoriteItem[] = [];
  compDest$: Subject<any> = new Subject<any>();

  constructor(public fds: RestDataFireService, public route: ActivatedRoute,
    public ofs: OrderFormService, public cs: CartService, public sbs: SnackbarService,
    public as: AuthService) {

    this.route.queryParamMap.pipe(
      takeUntil(this.compDest$),
      switchMap((params: Params) => {
        return this.as.currentUser$.pipe(
          takeUntil(this.compDest$)
        );
      })
    ).subscribe((u: VerifiedUser) => {
      if (u) {
        this.ofs.refreshComponent$.next();
        this.createDefaultDrink(u);

      }
    });
  }

  ngOnInit() {
    this.as.currentUser$.pipe(
      takeUntil(this.compDest$),
      switchMap((u) => {
        return this.cs.getFavItemsObs(this.cs.getFavItemListFDB(u.uid));
      })
    ).subscribe((favs: DrinkFavoriteItem[]) => {
      this.favItems = [...favs];
    });
  }

  /**
   * Create the default Drink Detail when new order is clicked
   */
  createDefaultDrink(u: VerifiedUser) {
    const ice = new DrinkIceLevel(null, null);
    const sugar = new DrinkSugarLevel(null, null);
    const size = new DrinkSize(null, null);
    const drinkType = new DrinkType(null, null, null, null);
    const toppings: DrinkTopping[] = [];
    let alias: User;
    if (u && u.inAppAliases) {
      alias = u.inAppAliases.alias;
    }
    this.drinkOrder = new DrinkOrderDetail(ice, drinkType, size, sugar, toppings, alias);
  }

  /**
   * Create a drink order based on Favorites click
   */
  onFavSelect(d: DrinkFavoriteItem) {
    const ice = new DrinkIceLevel(d.favDrink.iceLevel.name,
      d.favDrink.iceLevel.display);
    const sugar = new DrinkSugarLevel(d.favDrink.sugar.name, d.favDrink.sugar.display);
    const size = new DrinkSize(d.favDrink.size.name, d.favDrink.size.display);
    const drinkType = new DrinkType(d.favDrink.drinkType.name, d.favDrink.drinkType.display,
      d.favDrink.drinkType.seriesName, d.favDrink.drinkType.seriesDisplay);
    let toppings: DrinkTopping[] = [];
    if (d.favDrink.toppings) {
      d.favDrink.toppings.forEach((t: DrinkTopping) => {
        toppings.push(t);
      });
    }
    const u: User = d.user;
    this.drinkOrder = new DrinkOrderDetail(ice, drinkType, size, sugar, toppings, u);
    this.sbs.openSnackBar('"' + d.fireKey + '" has been applied.')
  }

  // 1 Grab ID from query param
  // 2 look for that drink from favorites list in service using the ID
  loadFavorite() {

  }

  ngOnDestroy() {
    this.compDest$.next();
  }
}
