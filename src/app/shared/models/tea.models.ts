import { User } from './user.model';
import { IBaseItem } from './base.model';


export class DrinkOrder {
  public fireKey: string;
  public date: number;
  public orders: DrinkOrderDetail[];
  public user: User;

  constructor(fireKey: string, date: number, orders: DrinkOrderDetail[], user: User) {
    this.fireKey = fireKey ? fireKey : undefined;
    this.date = date ? date : new Date().getTime();
    this.user = user ? user : new User(null, null);
    this.orders = this.createOrderDetails(orders);
  }

  createOrderDetails(ord: any[]) {
    let res: DrinkOrderDetail[] = [];
    ord.forEach((val: {[k: string]: IBaseItem & any[]}, i: number) => {
      let toppings: DrinkTopping[] = [];
      val['toppings'].forEach((top: IBaseItem) => {
        toppings.push(new DrinkTopping(top.name, top.display));
      });

      res.push(new DrinkOrderDetail(
        new DrinkIceLevel(val['ice-level'].name, val['ice-level'].display),
        new DrinkType(val['order'].name, val['order'].display,
          val['order']['seriesName'], val['order']['seriesDisplay']),
        new DrinkSize(val['size'].name, val['size'].display),
        new DrinkSugarLevel(val['sugar-level'].name, val['sugar-level'].display),
        toppings
      ))
    });

    return res;
  }
}


export class DrinkOrderDetail {
  constructor(public iceLevel: DrinkIceLevel, public drinkType: DrinkType,
    public size: DrinkSize, public sugar: DrinkSugarLevel, public toppings: DrinkTopping[]) {

  }
}

export class DrinkType implements IBaseItem {
  constructor(public name: string, public display: string,
    public seriesName: string, public seriesDisplay: string) {

    this.name = name ? name : "blackMilkTea";
    this.display = display ? display : "Black Milk Tea (default)";
    this.seriesName = seriesName ? seriesName : "milkTea";
    this.seriesDisplay = seriesDisplay ? seriesDisplay : "Milk Tea";
  }
}

export class DrinkIceLevel implements IBaseItem{
  constructor(public name: string, public display: string) {
    this.name = name ? name : "none";
    this.display = display ? display : "No Ice";
  }
}

export class DrinkSize implements IBaseItem {
  constructor(public name: string, public display: string) {
    this.name = name ? name : "medium";
    this.display = display ? display : "Medium";
  }
}

export class DrinkSugarLevel implements IBaseItem {
  constructor(public name: string, public display: string) {
    this.name = name ? name : "100";
    this.display = display ? display : "Sugar 100%";
  }
}

export class DrinkTopping implements IBaseItem {
  constructor(public name: string, public display: string) {
    this.name = name ? name : "pearls";
    this.display = display ? display : "Black Pearls";
  }
}
