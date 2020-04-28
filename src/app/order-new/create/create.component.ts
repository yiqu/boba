import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RestDataFireService } from '../../shared/services/fire-data.service';
import { DrinkOrder, DrinkOrderDetail, DrinkIceLevel, DrinkSugarLevel,
  DrinkSize, DrinkType, DrinkTopping, DrinkFavoriteItem } from '../../shared/models/tea.models';
import { User } from '../..//shared/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { OrderFormService } from '../..//shared/order-form/order-form.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
    public ofs: OrderFormService, public cs: CartService) {
    this.route.queryParamMap.subscribe((val) => {
      this.ofs.refreshComponent$.next();
      this.createDefaultDrink();
    });

  }

  ngOnInit() {
    this.createDefaultDrink();

    this.cs.favItemsList$.pipe(
      takeUntil(this.compDest$)
    )
    .subscribe((favs: DrinkFavoriteItem[]) => {
      this.favItems = [...favs];
    });
  }

  /**
   * Create the default Drink Detail when new order is clicked
   */
  createDefaultDrink() {
    const createDate: number = new Date().getTime();
    const user: User = new User("kevin", "Kevin");
    const ice = new DrinkIceLevel(null, null);
    const sugar = new DrinkSugarLevel(null, null);
    const size = new DrinkSize(null, null);
    const drinkType = new DrinkType(null, null, null, null);
    const toppings: DrinkTopping[] = [];
    this.drinkOrder = new DrinkOrderDetail(ice, drinkType, size, sugar, toppings);
  }

  onFavSelect(d: DrinkFavoriteItem) {
    console.log(d)
    const ice = new DrinkIceLevel(d.favDrink.iceLevel.name,
      d.favDrink.iceLevel.display);
    const sugar = new DrinkSugarLevel(d.favDrink.sugar.name, d.favDrink.sugar.display);
    const size = new DrinkSize(d.favDrink.size.name, d.favDrink.size.display);
    const drinkType = new DrinkType(d.favDrink.drinkType.name, d.favDrink.drinkType.display,
      d.favDrink.drinkType.seriesName, d.favDrink.drinkType.seriesDisplay);
    let toppings: DrinkTopping[] = [];
    d.favDrink.toppings.forEach((t: DrinkTopping) => {
      toppings.push(t);
    });
    const u: User = d.user;
    this.drinkOrder = new DrinkOrderDetail(ice, drinkType, size, sugar, toppings, u);
  }

  // 1 Grab ID from query param
  // 2 look for that drink from favorites list in service using the ID
  loadFavorite() {

  }

  ngOnDestroy() {

  }
}
