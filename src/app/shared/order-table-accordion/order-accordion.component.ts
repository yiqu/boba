import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DrinkOrder } from '../models/tea.models';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-shared-order-accordion',
  templateUrl: 'order-accordion.component.html',
  styleUrls: ['./order-accordion.component.css']
})

export class OrderAccordionComponent implements OnInit {

  @ViewChild(MatAccordion)
  matAccord: MatAccordion;

  @Input()
  drinkOrder: DrinkOrder;

  panelsExpanded: boolean = true;

  constructor() {

  }

  ngOnInit() {

  }

  collapseAccord() {
    this.matAccord.closeAll();
  }

  expandAccord() {
    this.matAccord.openAll();
  }
}
