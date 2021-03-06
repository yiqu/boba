import { User } from './user.model';
import { IBaseItem, DrinkItem, ToppingItem, DrinkSeries } from './base.model';


export class DrinkOrder {
  public fireKey: string;
  public date: number;
  public orders: DrinkOrderDetail[];
  public user: User;
  public groupedOrders?: DrinkOrder[];

  constructor(fireKey: string, date: number, orders: DrinkOrderDetail[], user: User,
    groupedOrders?: DrinkOrder[]) {

    this.fireKey = fireKey ? fireKey : null;
    this.date = date ? date : new Date().getTime();
    this.user = user ? user : new User(null, null);
    this.orders = this.createOrderDetails(orders);
    this.groupedOrders = groupedOrders ? groupedOrders : null;
  }

  createOrderDetails(ord: any[]) {
    let res: DrinkOrderDetail[] = [];
    ord.forEach((val: {[k: string]: IBaseItem & any[]}, i: number) => {
      let toppings: DrinkTopping[] = [];
      if (val['toppings']) {
        val['toppings'].forEach((top: IBaseItem) => {
          toppings.push(new DrinkTopping(top.name, top.display));
        });
      }

      const iLevel = (val['ice-level']!==undefined) ? val['ice-level'] : val.iceLevel;
      const dType = (val['order']!==undefined) ? val['order'] : val.drinkType;
      const sLevel = (val['sugar-level']!==undefined) ? val['sugar-level'] : val.sugar;

      res.push(new DrinkOrderDetail(

        new DrinkIceLevel(iLevel.name, iLevel.display),

        new DrinkType(dType.name, dType.display,
          dType['seriesName'], dType['seriesDisplay']),

        new DrinkSize(val['size'].name, val['size'].display),

        new DrinkSugarLevel(sLevel.name, sLevel.display),
        toppings
      ))
    });

    return res;
  }
}


export class DrinkOrderDetail {
  constructor(public iceLevel: DrinkIceLevel, public drinkType: DrinkType,
    public size: DrinkSize, public sugar: DrinkSugarLevel, public toppings: DrinkTopping[],
    public user: User = null) {

  }
}

export class DrinkType implements IBaseItem {
  constructor(public name: string, public display: string,
    public seriesName: DrinkSeries, public seriesDisplay: string) {

    this.name = name ? name : null;
    this.display = display ? display : null;
    this.seriesName = seriesName ? seriesName : null;
    this.seriesDisplay = seriesDisplay ? seriesDisplay : null;
  }
}

export class DrinkIceLevel implements IBaseItem{
  constructor(public name: string, public display: string) {
    this.name = name ? name : "0";
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
    this.name = name ? name : null;
    this.display = display ? display : null;
  }
}


export class DrinkFavoriteItem {
  constructor(public fireKey: string, public user: User, public date: number,
    public favDrink: DrinkOrderDetail) {

  }
}

export class InventoryCatagoryMap {
  constructor(public milkTeas: DrinkItem[], public creativeMixTeas: DrinkItem[],
    public yogurtDrinks: DrinkItem[], public toppings: ToppingItem[]) {

  }
}
