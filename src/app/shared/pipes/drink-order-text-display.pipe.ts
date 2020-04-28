import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';
import { DrinkOrderDetail } from '../models/tea.models';

@Pipe({
  name: 'drinkOrderDetailText',
  pure: true
})
export class DrinkOrderDetailDisplayPipe implements PipeTransform {

  transform(value: DrinkOrderDetail): string {
    let res: string = "";
    const drink = value.drinkType.display;
    const size = value.size.display;
    const ice = value.iceLevel.display;
    const sugar = value.sugar.display;
    const toppings = value.toppings;
    let toppingStr = "";
    if (toppings) {
      toppings.forEach((val, index) => {
        let end = (index === toppings.length-1) ? "" : ", "
        toppingStr = toppingStr + val.display + end;
      })
    } else {
      toppingStr = " No toppings";
    }
    res = size.toUpperCase() + ", " + drink + ", " +
      ice.toLowerCase() + ", " + sugar.toLowerCase() + ", " +
      toppingStr;
    return res;
  }
}
