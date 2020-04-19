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
