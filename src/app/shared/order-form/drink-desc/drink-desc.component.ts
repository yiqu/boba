import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { IBaseItem, BaseItem, DrinkSeries, DrinkItem } from '../../models/base.model';
import { FormControl } from '@angular/forms';
import * as _ from 'lodash';
import { RestDataFireService } from '../../services/fire-data.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OrderFormService } from '../order-form.service';

@Component({
  selector: 'app-shared-order-form-drink-desc',
  templateUrl: 'drink-desc.component.html',
  styleUrls: ['./drink-desc.component.css', '../order-form.component.css']
})
export class DrinkDescComponent implements OnInit, OnDestroy, OnChanges {

  @Input()
  drinkNameCtrl: FormControl;

  @Input()
  seriesSelection: DrinkSeries;

  drinkNames: DrinkItem[] = [];
  compDest$: Subject<any> = new Subject<any>();

  constructor(public fds: RestDataFireService, public ofs: OrderFormService) {

  }

  ngOnChanges(changes) {
    this.compDest$.next();
    this.setUpDrinksBySeries();
  }

  ngOnInit() {
  }

  setUpDrinksBySeries() {
    this.fds.getDrinksBySeriesObs(this.seriesSelection).pipe(
      takeUntil(this.compDest$),
      takeUntil(this.ofs.refreshComponent$)
    ).subscribe(
      (val: DrinkItem[]) => {
        this.drinkNames = [...val];
        this.drinkNames = _.sortBy(this.drinkNames , ['display']);
        this.setDefaultValue();
      }
    );
  }

  get isDrinkSeriesSelected(): boolean {
    return this.ofs.orderFg.get("seriesName").valid;
  }

  setDefaultValue() {
    if (this.drinkNameCtrl.value) {
      const i: number = _.findIndex(this.drinkNames, ['name', this.drinkNameCtrl.value['name']]);
      if (i > -1) {
        this.drinkNameCtrl.setValue(this.drinkNames[i]);
      }
    }
  }

  ngOnDestroy() {
    this.compDest$.next();
    this.compDest$.complete();
  }
}
