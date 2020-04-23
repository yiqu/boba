import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DrinkOrder, DrinkOrderDetail, DrinkTopping } from '../models/tea.models';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import * as fu from '../utils/form.utils';
import { DrinkSeries } from '../models/base.model';
import { STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { OrderFormService } from './order-form.service';

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

  orderFg: FormGroup;
  currentDrinkSeries: DrinkSeries;

  get drinkSeriesFc(): FormControl {
    //return <FormControl>this.orderFg.get("seriesName");
    return <FormControl>this.ofs.orderFg.get("seriesName");
  }

  get drinkNameFc(): FormControl {
    //return <FormControl>this.orderFg.get("drinkName");
    return <FormControl>this.ofs.orderFg.get("drinkName");
  }

  get drinkSettingsFg(): FormGroup {
    //return <FormGroup>this.orderFg.get("settings");
    return <FormGroup>this.ofs.orderFg.get("settings");
  }

  get drinkToppingsFa(): FormArray {
    //return <FormArray>this.orderFg.get("toppings");
    return <FormArray>this.ofs.orderFg.get("toppings");
  }

  constructor(public fb: FormBuilder, public ofs: OrderFormService) {
  }

  ngOnChanges(changes) {
    if (this.drinkOrder) {
      //this.orderFg = this.createForm(this.drinkOrder);
      this.ofs.orderFg = null;
      this.ofs.orderFg = this.createForm(this.drinkOrder);
      console.log("FG created: ",this.ofs.orderFg)
    }

    // this.orderFg.valueChanges.subscribe(
    //   (val) => {
    //     console.log("changes", val)
    //     this.currentDrinkSeries = this.drinkSeriesFc.value.name;
    //   }
    // )
    this.ofs.orderFg.valueChanges.subscribe(
      (val) => {
        console.log("changes", this.ofs.orderFg.controls)
        this.currentDrinkSeries = this.drinkSeriesFc.value.name;
      }
    )

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
    fg.addControl("size", fu.createFormControl(this.drinkOrder.size, false, [Validators.required]));
    // fg.addControl("ice", fu.createFormControl(this.drinkOrder.iceLevel, false, [Validators.required]));
    // fg.addControl("sugar", fu.createFormControl(this.drinkOrder.sugar, false, [Validators.required]));

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
    return fg;
  }

  ngOnDestroy() {

  }
}
