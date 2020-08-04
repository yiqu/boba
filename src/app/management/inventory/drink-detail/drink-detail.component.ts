import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DrinkItem, DrinkSeriesObject, ToppingItem } from '../../../shared/models/base.model';
import { ManagementInventoryService } from '../../../shared/services/management-inv.service';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as fu from '../../../shared/utils/form.utils';
import * as gu from '../../../shared/utils/utils';
import * as _ from 'lodash';
import * as fv from '../../../shared/validators/general-form.validator';
import { SnackbarService } from '../../../shared/services/snackbar.service';

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
  currentDrinkFireKey: string;

  constructor(public router: Router, public route: ActivatedRoute,
    public is: ManagementInventoryService, public fb: FormBuilder,
    public sbs: SnackbarService) {

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
        this.lastUpdated = this.getLastUpdated();
      } else {
        this.currentDrink = null;
      }
    });
  }

  ngOnInit() {

  }

  isDrinkDetailValid(res: any) {
    return res['display'] && res['name'];
  }

  createDetailFg() {
    this.detailFg = this.fb.group({
      display: fu.createFormControl(this.currentDrink.display, false, [Validators.required, fv.customOnlyLettersValidator]),
      name: fu.createFormControl(this.currentDrink.name, false, [Validators.required, fv.customOnlyLettersValidator]),
      //drinkSeries: fu.createFormControl(this.getFetchedDrinkSeriesValue(), false, [Validators.required]),
      drinkCost: fu.createFormControl2(this.getDrinkCost(), false, [fv.customOnlyNumbersValidator])
    });
    if (this.currentDrink.seriesName) {
      this.detailFg.addControl("drinkSeries", fu.createFormControl(this.getFetchedDrinkSeriesValue(), false, [Validators.required]));
    }
    if (this.currentDrink['itemType']) {
      this.detailFg.addControl("itemType", fu.createFormControl(this.currentDrink['itemType'], false, [Validators.required]));
    }
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
    const item = this.createDrinkItemToUpdate();
    if (item) {
      const seriesSame: boolean = this.isSeriesSame(item);

      let itemType: string;
      if (item['itemType']) {
        itemType = item['itemType'];
      } else if (item.seriesName) {
        itemType = this.getFirebaseDrinkSeries(item.seriesName);
      }

      this.is.getDrinkDetail(itemType, this.currentDrink.fireKey).set(item).then((res) => {
        this.sbs.openSnackBar(item.display + " saved!", 1000);
        if (!seriesSame) {
          this.is.getDrinkDetail(this.getFirebaseDrinkSeries(this.currentDrink.seriesName),
            this.currentDrink.fireKey).remove();
        }
        this.router.navigate(['../../'], {relativeTo: this.route});
      },
      (err) => {
        this.sbs.openSnackBar(item.display + " could not be saved, error occured: " +  err['code']);
      }).finally(() => {
        //this.router.navigate(['../../'], {relativeTo: this.route});
      });
    }
  }

  /**
   * If series was updated, then remove the item from its previous series
   */
  isSeriesSame(currItem: DrinkItem): boolean {
    if (this.currentDrink && this.currentDrink.seriesName) {
      const prev = this.currentDrink.seriesName;
      const curr = currItem.seriesName;
      return prev === curr;
    }
    return true;
  }

  createDrinkItemToUpdate(): DrinkItem | null {
    const val = this.detailFg.value;
    const sd = val.drinkSeries ? val.drinkSeries.seriesDisplay : null;
    const sn = val.drinkSeries ? val.drinkSeries.seriesName : null;

    if (this.detailFg.valid) {
      let item: DrinkItem = new DrinkItem(val.display, val.name, sd,
        sn, null, val.drinkCost, new Date().getTime());
      if (val.itemType) {
        item['itemType'] = val.itemType;
      }
      return item;
    }
    return null;
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
      case "toppings": {
        res = "toppings";
        break;
      }
    }
    return res;
  }
}
