import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RestDataFireService } from 'src/app/shared/services/fire-data.service';
import { DrinkOrder, DrinkOrderDetail, DrinkIceLevel, DrinkSugarLevel, DrinkSize, DrinkType, DrinkTopping } from 'src/app/shared/models/tea.models';
import { User } from 'src/app/shared/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { OrderFormService } from 'src/app/shared/order-form/order-form.service';

@Component({
  selector: 'app-order-new-create',
  templateUrl: 'create.component.html',
  styleUrls: ['./create.component.css']
})
export class OrderNewCreateComponent implements OnInit, OnDestroy {

  drinkOrder: DrinkOrderDetail;

  constructor(public fds: RestDataFireService, public route: ActivatedRoute,
      public ofs: OrderFormService) {
    this.route.queryParamMap.subscribe((val) => {
      this.ofs.refreshComponent$.next();
      this.createDefaultDrink();
    })
  }

  ngOnInit() {
    this.createDefaultDrink();
  }

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

  // 1 Grab ID from query param
  // 2 look for that drink from favorites list in service using the ID
  loadFavorite() {

  }

  ngOnDestroy() {

  }
}
