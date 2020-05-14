import { CanActivate, ActivatedRoute, ActivatedRouteSnapshot,
  RouterStateSnapshot, Router,
  CanActivateChild,
  UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CartService } from '../services/cart.service';
import { DrinkOrder } from '../models/tea.models';
import { AuthService } from '../services/auth.service';
import { VerifiedUser } from '../models/user.model';

/**
 * Route guard to check if there is a current user
 * Redirect to please log in or register page
 */
@Injectable({
  providedIn: 'root'
})
export class CurrentUserExistGuard implements CanActivate {
  constructor(public router: Router, public route: ActivatedRoute,
    public as: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean | UrlTree | Observable<boolean | UrlTree> {
    return this.as.currentUser$.pipe(
      map((user: VerifiedUser) => {
        if (user) {
          return true;
        } else {
          return this.router.createUrlTree(['/', 'new-customer']);;
        }
      })
    )
  }

}
