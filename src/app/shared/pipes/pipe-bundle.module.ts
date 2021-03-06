import { NgModule } from '@angular/core';
import { CountNumberDisplayPipe } from './count-display.pipe';
import { PluralDisplayPipe } from './plural.pipe';
import { DateDisplayPipe } from './time-utils.pipe';
import { ToppingUrlPipe, OrderTableDrinkDetailDisplayPipe,
  OrderTableDrinkSugarDisplayPipe, OrderTableDrinkIceDisplayPipe, DrinkTypeUrlPipe } from './topping-icon.pipe';
import { DrinkOrderDetailDisplayPipe } from './drink-order-text-display.pipe';
import { InventoryDrinkDisplayPipe } from './inventory-displays.pipe';
import { UserDisplayPipe } from './user.pipe';
import { TableColumnDisplayPipe, TableDataDisplayPipe } from './table.pipe';

@NgModule({
  imports: [],

  exports: [
    PluralDisplayPipe,
    CountNumberDisplayPipe,
    DateDisplayPipe,
    ToppingUrlPipe,
    OrderTableDrinkDetailDisplayPipe,
    OrderTableDrinkIceDisplayPipe,
    OrderTableDrinkSugarDisplayPipe,
    DrinkOrderDetailDisplayPipe,
    DrinkTypeUrlPipe,
    InventoryDrinkDisplayPipe,
    UserDisplayPipe,
    TableColumnDisplayPipe,
    TableDataDisplayPipe
  ],

  declarations: [
    PluralDisplayPipe,
    CountNumberDisplayPipe,
    DateDisplayPipe,
    ToppingUrlPipe,
    OrderTableDrinkDetailDisplayPipe,
    OrderTableDrinkSugarDisplayPipe,
    OrderTableDrinkIceDisplayPipe,
    DrinkOrderDetailDisplayPipe,
    DrinkTypeUrlPipe,
    InventoryDrinkDisplayPipe,
    UserDisplayPipe,
    TableColumnDisplayPipe,
    TableDataDisplayPipe
  ],

  providers: [],
})
export class PipeBundleModule { }
