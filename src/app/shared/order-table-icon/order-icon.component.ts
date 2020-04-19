import { Component, OnInit, Input } from '@angular/core';
import { DrinkSeries } from '../models/base.model';

@Component({
  selector: 'app-shared-order-table-icon',
  templateUrl: 'order-icon.component.html',
  styleUrls: ['./order-icon.component.css']
})

export class OrderTableIconComponent implements OnInit {

  @Input()
  drinkSeries: DrinkSeries;


  constructor() {

  }

  ngOnInit() {
    console.log("series:", this.drinkSeries)
  }
}
