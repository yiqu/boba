import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseItem } from '../../models/base.model';
import { RestDataFireService } from '../../services/fire-data.service';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';
import { OrderFormService } from '../order-form.service';

@Component({
  selector: 'app-shared-order-form-settings-desc',
  templateUrl: 'settings-desc.component.html',
  styleUrls: ['./settings-desc.component.css', '../order-form.component.css']
})
export class SettingsDescComponent implements OnInit, OnDestroy, OnChanges {

  @Input()
  settingsFg: FormGroup;

  drinkSizes: BaseItem[] = [];
  iceOptions: BaseItem[] = [];
  sugarOptions: BaseItem[] = [];
  allOptionsLoaded: boolean = false;
  compDest$: Subject<any> = new Subject<any>();
  sugarSliderVal: number;
  iceSliderVal: number;
  currentSugarLevel: BaseItem;
  currentIceLevel: BaseItem;
  sugarSliderLimit: SliderLimit = new SliderLimit();
  iceSliderLimit: SliderLimit = new SliderLimit();

  get drinkSizeFc(): FormControl {
    return <FormControl>this.settingsFg.get("size");
  }

  get drinkIceFc(): FormControl {
    return <FormControl>this.settingsFg.get("ice");
  }

  get drinkSugarFc(): FormControl {
    return <FormControl>this.settingsFg.get("sugar");
  }


  constructor(public fds: RestDataFireService, public ofs: OrderFormService) {

  }

  ngOnInit() {

  }

  ngOnChanges(changes) {
    this.compDest$.next();
    this.setupSettingOptions2();
  }

  /**
   * Combine all 3 subs into one to emit 1 single object
   * containing all 3 properties
   */
  setupSettingOptions2() {
    combineLatest(
      this.fds.getDrinksBySettingOptionObs("size"),
      this.fds.getDrinksBySettingOptionObs("sugar-level"),
      this.fds.getDrinksBySettingOptionObs("ice-level"),
      (size, sugarLevel, iceLEvel) => {
        return {
          size: size,
          sugar: sugarLevel,
          ice: iceLEvel
        }
      }
    ).pipe(
      takeUntil(this.compDest$),
      takeUntil(this.ofs.refreshComponent$)
    )
    .subscribe(
      (val) => {
        if (val) {
          this.allOptionsLoaded = true;
          this.drinkSizes = val.size;
          this.iceOptions = val.ice;
          this.sugarOptions = val.sugar;
          this.sortOptionsAsc();

          this.setSugarSliderLimits();
          this.setIceSliderLimits();

          this.setSizeDefaultValue();
          this.setSugarDefaultValue();
          this.setIceDefaultValue();
        }
      },
    );
  }

  setSizeDefaultValue() {
    const i: number = _.findIndex(this.drinkSizes, ['name', this.drinkSizeFc.value['name']]);
    if (i > -1) {
      this.drinkSizeFc.setValue(this.drinkSizes[i]);
    }
  }


  setSugarDefaultValue() {
    const i: number = _.findIndex(this.sugarOptions, ['name', this.drinkSugarFc.value['name']]);
    this.sugarSliderVal = i;
    this.currentSugarLevel = this.sugarOptions[i];
    if (i > -1) {
      this.drinkSugarFc.setValue(this.currentSugarLevel);
    }
  }

  setIceDefaultValue() {
    let i: number = _.findIndex(this.iceOptions, ['name', this.drinkIceFc.value['name']]);
    if (this.drinkIceFc.value.name === "none") {
      i = 0;
    }
    this.iceSliderVal = i;
    this.currentIceLevel = this.iceOptions[i];
    if (i > -1) {
      this.drinkIceFc.setValue(this.currentIceLevel);
    }
  }

  sortOptionsAsc() {
    this.sugarOptions.sort((a, b) => {
      if (+a.name < +b.name) {
        return -1;
      }
      return 1;
    });
    this.iceOptions.sort((a, b) => {
      if (+a.name < +b.name) {
        return -1;
      }
      return 1;
    });
  }

  setSugarSliderLimits() {
    this.sugarSliderLimit.max = (this.sugarOptions.length-1);
  }

  setIceSliderLimits() {
    this.iceSliderLimit.max = (this.iceOptions.length-1);
  }

  onSugarLevelChange() {
    this.currentSugarLevel = this.sugarOptions[+this.sugarSliderVal];
    this.drinkSugarFc.setValue(this.currentSugarLevel);
  }

  onIceLevelChange() {
    this.currentIceLevel = this.iceOptions[+this.iceSliderVal];
    this.drinkIceFc.setValue(this.currentIceLevel);
  }

  thumbDisplaySugarFn = (val: number) => {
    return this.sugarOptions[val]?.name;
  }

  thumbDisplayIceFn = (val: number) => {
    return this.iceOptions[val]?.name;
  }

  ngOnDestroy() {
    this.compDest$.next();
  }
}

export class SliderLimit {
  constructor(public min: number = 0, public max: number = 1){
  }
}
