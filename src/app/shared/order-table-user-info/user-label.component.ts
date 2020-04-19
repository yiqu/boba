import { Component, OnInit, Input } from '@angular/core';
import { DrinkSeries } from '../models/base.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-shared-order-user-info',
  templateUrl: 'user-label.component.html',
  styleUrls: ['./user-label.component.css']
})

export class OrderTableUserInfoComponent implements OnInit {

  @Input()
  userInfo: User;

  @Input()
  userNumber: number;

  @Input()
  ordersCount: number;


  constructor() {

  }

  ngOnInit() {
  }
}
