import { Component, OnInit, Input } from '@angular/core';
import { IBaseItem, BaseItem, DrinkSeries } from '../../models/base.model';
import { FormControl } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-shared-order-form-series-desc',
  templateUrl: 'series-desc.component.html',
  styleUrls: ['./series-desc.component.css']
})
export class SeriesDescComponent implements OnInit {

  @Input()
  seriesCtrl: FormControl;

  drinkSeries: BaseItem[] = [];

  constructor() {

  }

  ngOnInit() {
    console.log(this.seriesCtrl.value)
    this.drinkSeries.push(
      new BaseItem(DrinkSeries.MILK_TEA, "Milk Tea"),
      new BaseItem(DrinkSeries.FRUIT_TEA, "Creative Mix"),
      new BaseItem(DrinkSeries.YOGURT, "Yogurt")
    );
    this.setDefaultValue();
  }

  setDefaultValue() {
    const i: number = _.findIndex(this.drinkSeries, ['name', this.seriesCtrl.value['seriesDisplay']]);
    this.seriesCtrl.setValue(this.drinkSeries[i]);
  }
}
