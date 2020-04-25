import { Component, OnInit, Input, ViewChild, AfterContentInit, AfterViewInit } from '@angular/core';
import { DrinkOrder } from '../models/tea.models';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-shared-order-accordion',
  templateUrl: 'order-accordion.component.html',
  styleUrls: ['./order-accordion.component.css']
})

export class OrderAccordionComponent implements OnInit, AfterViewInit {

  @ViewChild(MatAccordion)
  matAccord: MatAccordion;

  @Input()
  drinkOrder: DrinkOrder;

  @Input()
  hideToggle: boolean = false;

  @Input()
  startAsCollapsed: boolean = false;

  panelsExpanded: boolean = true;

  constructor() {

  }

  ngOnInit() {
    if (this.startAsCollapsed) {
      this.panelsExpanded = false;
    }
  }

  ngAfterViewInit() {
    if (this.startAsCollapsed) {
      this.collapseAccord();
    }
  }

  collapseAccord() {
    this.matAccord.closeAll();
  }

  expandAccord() {
    this.matAccord.openAll();
  }
}
