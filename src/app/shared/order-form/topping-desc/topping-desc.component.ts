import { Component, OnInit, Input, OnDestroy, ViewChild, AfterViewChecked, AfterViewInit, OnChanges } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseItem } from '../../models/base.model';
import { RestDataFireService } from '../../services/fire-data.service';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import * as fu from '../../utils/form.utils';
import { OrderFormService } from '../order-form.service';

@Component({
  selector: 'app-shared-order-form-topping-desc',
  templateUrl: 'topping-desc.component.html',
  styleUrls: ['./topping-desc.component.css']
})
export class ToppingDescComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {

  @Input()
  toppingFa: FormArray;

  @ViewChild(MatSelectionList)
  toppingList: MatSelectionList;

  drinkToppings: BaseItem[] = [];
  compDest$: Subject<any> = new Subject<any>();
  defaultSelected: BaseItem[] =[];
  selectedCount: number = 0;

  constructor(public fds: RestDataFireService, public fb: FormBuilder, public ofs: OrderFormService) {

  }

  ngOnInit() {

  }

  ngOnChanges(c) {
    this.compDest$.next();
    this.setupToppings();
    this.defaultSelected = this.getDefaultSelected();
    this.selectedCount = this.toppingFa.length;
  }

  getDefaultSelected(): BaseItem[] {
    if (this.toppingFa.value) {
      return this.toppingFa.value;
    }
    return [];
  }

  ngAfterViewInit() {
  }

  onSelectionChange(res: MatSelectionListChange) {
    const selected: any[] = this.toppingList._value;
    this.selectedCount = res.source.selectedOptions.selected.length;

    let arrCtrls: FormControl[] = [];
    selected.forEach((val: BaseItem) => {
      arrCtrls.push(fu.createFormControl(val, false));
    });
    const fa = this.fb.array(arrCtrls);
    this.ofs.orderFg.setControl("toppings", fa);
  }

  setupToppings() {
    this.fds.getDrinkToppingObs().pipe(
      takeUntil(this.compDest$),
      takeUntil(this.ofs.refreshComponent$)
    ).subscribe(
      (val: BaseItem[]) => {
        if (val) {
          this.drinkToppings = _.sortBy(val, ['display']);
        }
      }
    );
  }

  compareFn = (o1: BaseItem, o2: BaseItem) => {
    return o1.name === o2.name;
  }

  ngOnDestroy() {
    this.compDest$.next();
  }
}
