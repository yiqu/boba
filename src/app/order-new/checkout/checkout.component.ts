import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { DrinkOrder } from 'src/app/shared/models/tea.models';

@Component({
  selector: 'app-order-new-checkout',
  templateUrl: 'checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  compDest$: Subject<any> = new Subject<any>();
  cartOrders: DrinkOrder[] = [];

  constructor(public cs: CartService) {

  }

  ngOnInit() {
    this.cs.cartItemList$.pipe(
      takeUntil(this.compDest$),
    ).subscribe(
      (val) => {
        this.cartOrders = [...val];
      }
    );
  }

  ngOnDestroy() {

  }
}
