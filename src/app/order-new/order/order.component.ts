import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-order-new-order',
  templateUrl: 'order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderNewOrderComponent implements OnInit {

  orderId: string;

  constructor(public router: Router, public route: ActivatedRoute) {

    this.route.paramMap.subscribe((val: ParamMap) => {
      console.log("single order:",val.keys)
      this.orderId = val.get("id");
    });
  }

  ngOnInit() { }
}
