import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { Subject, from, of, Observable } from 'rxjs';
import { takeUntil, map, switchMap, delay, concatAll, concatMap } from 'rxjs/operators';
import { DrinkOrder } from 'src/app/shared/models/tea.models';
import { RestDataFireService } from 'src/app/shared/services/fire-data.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-new-checkout',
  templateUrl: 'checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  compDest$: Subject<any> = new Subject<any>();
  cartOrders: DrinkOrder[] = [];

  constructor(public cs: CartService, public rfd: RestDataFireService,
    public sbs: SnackbarService, public router: Router,
    public route: ActivatedRoute) {

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

  onPlaceOrder() {
    const ordersToSubmit: DrinkOrder[] = this.cs.createGroupByUser(this.cartOrders);

    from(ordersToSubmit).pipe(
      concatMap((val: DrinkOrder) => {
        return this.rfd.openOrdersFDB.push(val);
      })
    ).subscribe(
      (val) => {
      },
      (err) => {
      },
      () => {
        this.sbs.openSnackBar("We have received your orders!");

        from(this.cartOrders).pipe(
          map((val: DrinkOrder) => {
            return of(this.cs.cartItemsListFire.remove(val.fireKey))
          }),
          concatAll()
        ).subscribe(
          (val) => {
          },
          (err) => {
          },
          () => {
            this.sbs.openSnackBar("We have received your orders.");
            this.goToCart();
          })
      })
  }

  goToCart() {
    this.router.navigate(['../', 'all'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.compDest$.next();
  }
}
