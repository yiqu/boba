import { Component, OnInit, Input } from '@angular/core';
import { DrinkOrder } from '../models/tea.models';

@Component({
  selector: 'app-shared-order-accordion',
  templateUrl: 'order-accordion.component.html',
  styleUrls: ['./order-accordion.component.css']
})

export class OrderAccordionComponent implements OnInit {

  @Input()
  drinkOrder: DrinkOrder;

  panelsExpanded: boolean = true;

  constructor() {

  }

  ngOnInit() {

  }
}
