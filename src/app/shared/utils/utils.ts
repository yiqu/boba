import { DrinkSeriesObject, DrinkSeries } from '../models/base.model';

export function getAllDrinkTypes(): DrinkSeriesObject[] {
  return [
    new DrinkSeriesObject("Milk Tea", DrinkSeries.MILK_TEA),
    new DrinkSeriesObject("Creative Mix", DrinkSeries.FRUIT_TEA),
    new DrinkSeriesObject("Yogurt", DrinkSeries.YOGURT)
  ]
}
