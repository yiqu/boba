import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';
import { DrinkTopping } from '../models/base.model';

@Pipe({
  name: 'toppingUrl',
  pure: true
})
export class ToppingUrlPipe implements PipeTransform {
  private baseToppingSrcUrl: string = "assets/images/main/toppings/";

  @memo()
  transform(value: string): any {
    return this.getDrinkToppingIcon(value);

  }

  getDrinkToppingIcon(val: string) {
    let top: string;
    switch(val) {
      case DrinkTopping.AIYU_JELLY: {
        top = "jelly";
        break;
      }
      case DrinkTopping.BLK_PEARL: {
        top = "pearl";
        break;
      }
      case DrinkTopping.COCONUT_JELLY: {
        top = "coconut";
        break;
      }
      case DrinkTopping.PUDDING: {
        top = "pudding";
        break;
      }
      case DrinkTopping.READBEAN: {
        top = "bean";
        break;
      }
      case DrinkTopping.STRAWBERRY_PEARL: {
        top = "strawberry";
        break;
      }
      case DrinkTopping.WHITE_PEARL: {
        top = "pearl-white";
        break;
      }
      default: {
        top = "jelly";
      }
    }
    return this.baseToppingSrcUrl + top + ".png";
  }
}


@Pipe({
  name: 'orderTableDrinkDetail',
  pure: true
})
export class OrderTableDrinkDetailDisplayPipe implements PipeTransform {

  @memo()
  transform(value: any): any {
    if (value === "large") {
      return "lg."
    } else if (value === "medium") {
      return "med."
    }
  }
}


@Pipe({
  name: 'orderTableDrinkIce',
  pure: true
})
export class OrderTableDrinkIceDisplayPipe implements PipeTransform {

  @memo()
  transform(value: any): any {
    return  "ice: " + value + "%";
  }
}


@Pipe({
  name: 'orderTableDrinkSugar',
  pure: true
})
export class OrderTableDrinkSugarDisplayPipe implements PipeTransform {

  @memo()
  transform(value: any): any {
    return "sugar: " + value + "%";
  }
}
