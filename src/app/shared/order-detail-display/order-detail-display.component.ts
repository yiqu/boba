import { Component, OnInit, Input, Output } from '@angular/core';
import { DrinkOrder, DrinkOrderDetail, DrinkTopping } from '../models/tea.models';
import { DrinkSeries } from '../models/base.model';

@Component({
  selector: 'app-shared-order-detail',
  templateUrl: 'order-detail-display.component.html',
  styleUrls: ['./order-detail-display.component.css']
})
export class OrderDetailDisplayComponent implements OnInit {

  private baseIconSrcUrl: string = "assets/images/main/icons/";


  @Input()
  orderDetail: DrinkOrderDetail;

  name: string;
  seriesName: string;
  size: string;
  iceLevel: string;
  sugarLevel: string;
  toppings: DrinkTopping[];
  iconUrl: string;


  constructor() {

  }

  ngOnInit() {
    console.log(this.orderDetail)
    this.createDetail(this.orderDetail);
  }

  createDetail(det: DrinkOrderDetail) {
    this.name = det.drinkType.display;
    this.seriesName = det.drinkType.seriesDisplay;
    this.size = det.size.display;
    this.iceLevel = det.iceLevel.display;
    this.sugarLevel = det.sugar.display;
    this.toppings = det.toppings;
    this.iconUrl = this.getDrinkTypeIcon(det.drinkType.seriesName);
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
    return this.baseIconSrcUrl + icon + "-tea-icon.png";
  }




}
