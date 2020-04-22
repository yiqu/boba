import { Component, OnInit, Input } from '@angular/core';
import { IBaseItem, BaseItem, DrinkSeries } from '../../models/base.model';
import { FormControl } from '@angular/forms';
import * as _ from 'lodash';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-shared-order-form-series-desc',
  templateUrl: 'series-desc.component.html',
  styleUrls: ['./series-desc.component.css', '../order-form.component.css']
})
export class SeriesDescComponent implements OnInit {

  @Input()
  seriesCtrl: FormControl;

  drinkSeries: BaseItem[] = [];
  compDest$: Subject<any> = new Subject<any>();

  constructor() {
  }

  ngOnInit() {
    this.drinkSeries.push(
      new BaseItem(DrinkSeries.MILK_TEA, "Milk Tea"),
      new BaseItem(DrinkSeries.FRUIT_TEA, "Creative Mix"),
      new BaseItem(DrinkSeries.YOGURT, "Yogurt")
    );
    this.setDefaultValue();
  }

  setDefaultValue() {
    const i: number = _.findIndex(this.drinkSeries, ['name', this.seriesCtrl.value['name']]);
    if (i > -1) {
      this.seriesCtrl.setValue(this.drinkSeries[i]);
    }
  }
}
