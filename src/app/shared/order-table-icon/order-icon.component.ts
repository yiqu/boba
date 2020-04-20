import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DrinkSeries } from '../models/base.model';

const CONTAINS_MILK: DrinkSeries[] = [DrinkSeries.MILK_TEA];
const CONTAINS_TEA: DrinkSeries[] = [DrinkSeries.MILK_TEA, DrinkSeries.FRUIT_TEA];
const CONTAINS_YOGURT: DrinkSeries[] = [DrinkSeries.YOGURT];

@Component({
  selector: 'app-shared-order-table-icon',
  templateUrl: 'order-icon.component.html',
  styleUrls: ['./order-icon.component.css']
})

export class OrderTableIconComponent implements OnInit, OnChanges {

  @Input()
  drinkSeries: DrinkSeries;

  showTeaIcon: boolean = false;
  drinkTypeUrl: string;
  private basesrcUrl: string = "assets/images/main/icons/";

  constructor() {
  }

  ngOnChanges() {
    this.isMilkShown(this.drinkSeries);
    this.drinkTypeUrl = this.getDrinkTypeIcon(this.drinkSeries);
  }

  ngOnInit() {
  }


  isMilkShown(drink: DrinkSeries) {
    this.showTeaIcon = CONTAINS_TEA.includes(drink);
  }

  getDrinkTypeIcon(drink: DrinkSeries): string {
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
    return this.basesrcUrl + icon + ".png";
  }

}
