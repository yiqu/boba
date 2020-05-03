import { User } from './user.model';
import { DrinkOrderDetail } from './tea.models';

export class BaseItem implements IBaseItem {
  constructor(public name: string, public display: string) {
  }
}

export interface IBaseItem {
  name: string;
  display: string;
}

export enum DrinkSeries {
  MILK_TEA = "milkTea",
  FRUIT_TEA = "creativeMix",
  YOGURT = "yogurt"
}

export enum DrinkTopping {
  COCONUT_JELLY = "coconutJelly",
  BLK_PEARL = "pearls",
  WHITE_PEARL = "whitePearls",
  STRAWBERRY_PEARL = "strawberryPearls",
  PUDDING = "pudding",
  AIYU_JELLY = "aiyuJelly",
  READBEAN = "redbean"
}

export enum OrderStatusType {
  OPEN = "open",
  CLOSED = "closed"
}

export class DrinkItem {
  constructor(public display: string, public name: string,
    public seriesDisplay: string, public seriesName: string, public fireKey?: string,
    public price?: any, public lastUpdated?: number) {
  }
}

export class DrinkFavorite {
  constructor(user: User, drinkDetail: DrinkOrderDetail, date: number) {

  }
}

export class DrinkSeriesObject {
  constructor(public seriesDisplay: string, public seriesName: DrinkSeries | string) {
  }
}
