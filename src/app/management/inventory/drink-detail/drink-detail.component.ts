import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DrinkItem, DrinkSeriesObject } from '../../../shared/models/base.model';
import { ManagementInventoryService } from '../../../shared/services/management-inv.service';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as fu from '../../../shared/utils/form.utils';
import * as gu from '../../../shared/utils/utils';
import * as _ from 'lodash';
import * as fv from '../../../shared/validators/general-form.validator';

@Component({
  selector: 'app-inventory-drink-detail',
  templateUrl: 'drink-detail.component.html',
  styleUrls: ['./drink-detail.component.css']
})
export class InventoryDrinkDetailComponent implements OnInit {


  currentDrink: DrinkItem;
  detailFg: FormGroup;
  seriesList: DrinkSeriesObject[] = gu.getAllDrinkTypes();
  lastUpdated: number;

  constructor(public router: Router, public route: ActivatedRoute,
    public is: ManagementInventoryService, public fb: FormBuilder) {

    this.route.paramMap.pipe(
      switchMap((pm: ParamMap) => {
        const series: string = this.getFirebaseDrinkSeries(pm.get("drinkSeries"));
        const firebaseId: string = pm.get("id");
        return this.is.getDrinkDetailObs(series, firebaseId);
      })
    )
    .subscribe((res) => {
      if (this.isDrinkDetailValid(res)) {
        this.currentDrink = res;
        this.createDetailFg();
        console.log(this.detailFg)
        this.lastUpdated = this.getLastUpdated();
      } else {
        this.currentDrink = null;
      }
    });
  }

  ngOnInit() {

  }

  isDrinkDetailValid(res: any) {
    return res['display'] && res['name'] && res['seriesDisplay'] && res['seriesName'];
  }

  createDetailFg() {
    this.detailFg = this.fb.group({
      display: fu.createFormControl(this.currentDrink.display, false, [Validators.required, fv.customOnlyLettersValidator]),
      name: fu.createFormControl(this.currentDrink.name, false, [Validators.required, fv.customOnlyLettersValidator]),
      drinkSeries: fu.createFormControl(this.getFetchedDrinkSeriesValue(), false, [Validators.required]),
      drinkCost: fu.createFormControl2(this.getDrinkCost(), false, [fv.customOnlyNumbersValidator])
    })
  }

  getFetchedDrinkSeriesValue(): DrinkSeriesObject {
    const i: number = _.findIndex(this.seriesList, ['seriesName', this.currentDrink.seriesName]);
    return this.seriesList[i];
  }

  getDrinkCost(): string {
    let res = "0.00";
    if (this.currentDrink.price) {
      res = this.currentDrink.price;
    }
    return res;
  }

  getLastUpdated(): number {
    let updated = 0;
    if (this.currentDrink.lastUpdated) {
      updated = this.currentDrink.lastUpdated;
    }
    return updated;
  }

  onUpdate() {
    console.log(this.detailFg.value)
  }

  getFirebaseDrinkSeries(series: string): string {
    let res: string;
    switch (series) {
      case "milkTea": {
        res = "teas";
        break;
      }
      case "creativeMix": {
        res = "creative-mix";
        break;
      }
      case "yogurt": {
        res = "yogurt";
        break;
      }
    }
    return res;
  }
}
