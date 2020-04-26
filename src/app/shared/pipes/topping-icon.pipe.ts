import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';
import { DrinkTopping, DrinkSeries } from '../models/base.model';

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

@Pipe({
  name: 'drinkTypeUrl',
  pure: true
})
export class DrinkTypeUrlPipe implements PipeTransform {
  private baseSrcUrl: string = "assets/images/main/icons/";

  @memo()
  transform(value: string): any {
    return this.getDrinkTypeIcon(value);
  }

  getDrinkTypeIcon(drink: string): string {
    let icon: string;
    switch (drink) {
      case DrinkSeries.FRUIT_TEA: {
        icon = "fruit";
        break;
      }
      case DrinkSeries.MILK_TEA: {
        icon = "milk";
        break;
      }
      case DrinkSeries.YOGURT: {
        icon = "yogurt";
        break;
      }
      default: {
        icon = null;
      }
    }
    return this.baseSrcUrl + icon + "-tea-icon.png";
  }
}
