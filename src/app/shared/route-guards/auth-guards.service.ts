import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute, ActivatedRouteSnapshot,
  RouterStateSnapshot, UrlTree, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { VerifiedUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthUserChildrenGuard implements CanActivateChild {
  constructor(public as: AuthService, public router: Router, public route: ActivatedRoute) {
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean> | boolean | UrlTree {

    return this.as.currentUser$
    .pipe(
      take(1),
      map((val: VerifiedUser) => {
        if (val) {
          return true;
        }
        return this.router.createUrlTree(['/', 'auth','signin']);
      })
    )
  }

}
