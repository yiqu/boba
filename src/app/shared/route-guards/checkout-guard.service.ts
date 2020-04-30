import { CanActivate, ActivatedRoute, ActivatedRouteSnapshot,
  RouterStateSnapshot, Router,
  CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CartService } from '../services/cart.service';
import { DrinkOrder } from '../models/tea.models';

/**
 * Route guard for /checkout
 * Redirect to new order page if there are no items in the cart
 */
@Injectable({
  providedIn: 'root'
})
export class CheckoutRouteGuard implements CanActivate {
  constructor(public router: Router, public route: ActivatedRoute, public cs: CartService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.cs.cartItemList$.pipe(
      map((val: DrinkOrder[]) => {
        if (val && val.length > 0) {
          return true;
        } else {
          this.router.navigate(['/', 'new-order']);
          return false;
        }
      })
    )
  }

}
