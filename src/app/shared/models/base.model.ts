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
