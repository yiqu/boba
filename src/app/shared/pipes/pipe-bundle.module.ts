import { NgModule } from '@angular/core';
import { CountNumberDisplayPipe } from './count-display.pipe';
import { PluralDisplayPipe } from './plural.pipe';
import { DateDisplayPipe } from './time-utils.pipe';
import { ToppingUrlPipe, OrderTableDrinkDetailDisplayPipe,
  OrderTableDrinkSugarDisplayPipe, OrderTableDrinkIceDisplayPipe } from './topping-icon.pipe';

@NgModule({
  imports: [],

  exports: [
    PluralDisplayPipe,
    CountNumberDisplayPipe,
    DateDisplayPipe,
    ToppingUrlPipe,
    OrderTableDrinkDetailDisplayPipe,
    OrderTableDrinkIceDisplayPipe,
    OrderTableDrinkSugarDisplayPipe
  ],

  declarations: [
    PluralDisplayPipe,
    CountNumberDisplayPipe,
    DateDisplayPipe,
    ToppingUrlPipe,
    OrderTableDrinkDetailDisplayPipe,
    OrderTableDrinkSugarDisplayPipe,
    OrderTableDrinkIceDisplayPipe
  ],

  providers: [],
})
export class PipeBundleModule { }
