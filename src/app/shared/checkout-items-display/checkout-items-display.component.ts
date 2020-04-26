import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DrinkOrder } from '../models/tea.models';

@Component({
  selector: 'app-shared-checkout-items-display',
  templateUrl: 'checkout-items-display.component.html',
  styleUrls: ['./checkout-items-display.component.css']
})
export class CheckoutItemsDisplayComponent implements OnInit, OnDestroy {

  @Input()
  cartOrders: DrinkOrder[] = [];

  constructor() {

  }

  ngOnInit() {

  }

  ngOnDestroy() {
  }
}
