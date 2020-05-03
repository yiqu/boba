import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';
import { DrinkItem } from '../models/base.model';

@Pipe({
  name: 'inventoryDrinkDisplay',
  pure: true
})
export class InventoryDrinkDisplayPipe implements PipeTransform {

  transform(value: DrinkItem): string {
    let res: string = "";
    const price = value.price ? value.price : 'Not set';
    res += (value.display + " - $" + price);
    return res;
  }
}
