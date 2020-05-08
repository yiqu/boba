import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute, ActivatedRouteSnapshot,
  RouterStateSnapshot, UrlTree, CanActivateChild } from '@angular/router';
import { Observable, combineLatest, Subject, of, from } from 'rxjs';
import { map, take, tap, skip } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { VerifiedUser } from '../models/user.model';
import * as firebase from 'firebase/app';
import 'firebase/auth';

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

@Injectable({
  providedIn: 'root'
})
export class AuthUserExistGuard implements CanActivate {
  constructor(public as: AuthService, public router: Router, public route: ActivatedRoute) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean> | boolean | UrlTree {

    // return this.as.currentUser$
    // .pipe(
    //   take(1),
    //   map((val: VerifiedUser) => {
    //     if (val) {
    //       return this.router.createUrlTree(['/', 'my-account']);;
    //     }
    //     return true;
    //   })
    // );

    // return combineLatest(this.as.currentUser$, this.as.authStateResolved$).pipe(
    //   take(1),
    //   map(([u, resolved]) => {
    //     console.log("user is", u, resolved);
    //     if (u) {
    //       return this.router.createUrlTree(['/', 'my-account']);;
    //     }
    //     return true;
    //   }),
    //   tap(() => {
    //   })
    // );


    let res: Subject<any> = new Subject<any>();
    firebase.auth().onAuthStateChanged(
      (user: firebase.User) => {
        if (user) {
          const u = (<VerifiedUser>user.toJSON());
          res.next(false);
          return this.router.createUrlTree(['/', 'my-account']);
        } else {
          res.next(true);
          return true;
        }
      },
      (err) => {
      }
    );

    return res.pipe(
      take(1),
      map((val) => {
        if (val) {
          return true;
        } else {
          return this.router.createUrlTree(['/', 'my-account']);
        }
      })
    )
  }
}
