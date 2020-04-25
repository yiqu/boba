import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges, ViewChild } from '@angular/core';
import { DrinkOrder, DrinkOrderDetail, DrinkTopping, DrinkIceLevel, DrinkType, DrinkSize, DrinkSugarLevel } from '../models/tea.models';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import * as fu from '../utils/form.utils';
import { DrinkSeries, BaseItem } from '../models/base.model';
import { STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { OrderFormService } from './order-form.service';
import { UserService } from '../services/user.service';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { takeUntil } from 'rxjs/operators';
import { User } from '../models/user.model';
import { RestDataFireService } from '../services/fire-data.service';
import { SnackbarService } from '../services/snackbar.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shared-order-form',
  templateUrl: 'order-form.component.html',
  styleUrls: ['./order-form.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class OrderFormComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  drinkOrder: DrinkOrderDetail;

  @Output()
  onDrinkSubmit: EventEmitter<DrinkOrder> = new EventEmitter<DrinkOrder>();

  @ViewChild(MatHorizontalStepper)
  orderStepper: MatHorizontalStepper;

  currentDrinkSeries: DrinkSeries;
  isFavorite: boolean = false;

  get drinkSeriesFc(): FormControl {
    return <FormControl>this.ofs.orderFg.get("seriesName");
  }

  get drinkNameFc(): FormControl {
    return <FormControl>this.ofs.orderFg.get("drinkName");
  }

  get drinkSettingsFg(): FormGroup {
    return <FormGroup>this.ofs.orderFg.get("settings");
  }

  get drinkToppingsFa(): FormArray {
    return <FormArray>this.ofs.orderFg.get("toppings");
  }

  get userFc(): FormControl {
    return <FormControl>this.ofs.orderFg.get("user");
  }

  constructor(public fb: FormBuilder, public ofs: OrderFormService,
    public us: UserService, public rdf: RestDataFireService, public sbs: SnackbarService,
    public router: Router, public route: ActivatedRoute) {
  }

  ngOnChanges(changes) {
    if (this.drinkOrder) {
      this.ofs.orderFg = null;
      this.ofs.orderFg = this.createForm(this.drinkOrder);
      console.log("FG created: ",this.ofs.orderFg)

      if (this.orderStepper) {
        this.orderStepper.reset();
      }

      this.ofs.orderFg.valueChanges.pipe(
        takeUntil(this.ofs.refreshComponent$)
      ).subscribe(
        (val) => {
          console.log("changes", this.ofs.orderFg.controls)
          this.currentDrinkSeries = this.drinkSeriesFc.value.name;
        }
      )
    }
  }

  ngOnInit() {

  }

  createForm(dOrder: DrinkOrderDetail): FormGroup {
    const fg = new FormGroup({});

    const dSeries = {
      name: dOrder.drinkType.seriesName,
      display: dOrder.drinkType.seriesDisplay
    }
    fg.addControl("seriesName", fu.createFormControl(dSeries, false, [Validators.required]));

    const drink = {
      name: dOrder.drinkType.name,
      display: dOrder.drinkType.display
    }
    fg.addControl("drinkName", fu.createFormControl(drink, false, [Validators.required]));
    fg.addControl("settings", this.fb.group({
      size: fu.createFormControl(this.drinkOrder.size, false, [Validators.required]),
      ice: fu.createFormControl(this.drinkOrder.iceLevel, false, [Validators.required]),
      sugar: fu.createFormControl(this.drinkOrder.sugar, false, [Validators.required])
    }));

    let toppingFa: FormArray = new FormArray([]);
    let aTopping: DrinkTopping = new DrinkTopping("pearls", "Coconut Jelly");
    let bTopping: DrinkTopping = new DrinkTopping("coconutJelly", "Pearls");
    toppingFa.push(
      fu.createFormControl(aTopping, false),
    );
    toppingFa.push(
      fu.createFormControl(bTopping, false),
    );
    fg.addControl("toppings", toppingFa);
    fg.addControl("user", fu.createFormControl(null, false, [Validators.required]));
    fg.addControl("isFavorite", fu.createFormControl(false, false));
    return fg;
  }

  onOrderSubmit() {
    console.log("order status:",this.ofs.orderFg.status)
    console.log("order value:",this.ofs.orderFg.value)
    console.log("order fg", this.ofs.orderFg)

    const formVal: any = this.ofs.orderFg.value;
    const reviewOrderDetail = this.createCurrentDrinkOrderDetail(formVal);

    let order = new DrinkOrder(null, new Date().getTime(), [],
      new User(formVal.user.id, formVal.user.display));
    order.orders = [reviewOrderDetail];
    console.log(order)
    this.rdf.getCartOrders().push(order).then(
      (val) => {
        this.sbs.openSnackBar("Added order to cart.");
        this.proceedToCart(formVal.isFavorite);
      },
      (err) => {
        this.sbs.openSnackBar("There was an error adding this order to cart. Try again.")
      }
    );
  }

  proceedToCart(addingToFavorite: boolean) {
    if (addingToFavorite) {

    } else {
      this.router.navigate(['../', 'all'], {relativeTo: this.route});
    }
  }

  createCurrentDrinkOrderDetail(formVal: any): DrinkOrderDetail {
    const ice = new DrinkIceLevel(formVal.settings.ice.name, formVal.settings.ice.display);
    const type = new DrinkType(formVal.drinkName.name, formVal.drinkName.display,
      formVal.seriesName.name, formVal.seriesName.display);
    const size = new DrinkSize(formVal.settings.size.name, formVal.settings.size.display);
    const sugar = new DrinkSugarLevel(formVal.settings.sugar.name, formVal.settings.sugar.display);
    let toppings: DrinkTopping[] = [];
    formVal.toppings.forEach((val: BaseItem) => {
      toppings.push(new DrinkTopping(val.name, val.display));
    });
    return new DrinkOrderDetail(ice, type, size, sugar, toppings);
  }

  ngOnDestroy() {

  }
}
