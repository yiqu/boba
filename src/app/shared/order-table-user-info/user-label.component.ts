import { Component, OnInit, Input } from '@angular/core';
import { DrinkSeries } from '../models/base.model';
import { User } from '../models/user.model';
import { DrinkOrder } from '../models/tea.models';

@Component({
  selector: 'app-shared-order-user-info',
  templateUrl: 'user-label.component.html',
  styleUrls: ['./user-label.component.css']
})

export class OrderTableUserInfoComponent implements OnInit {

  @Input()
  totalOrdersCount: number;

  @Input()
  orderNumber: number;

  @Input()
  order: DrinkOrder

  @Input()
  showOrderedDate: boolean = true;


  constructor() {

  }

  ngOnInit() {
  }
}
