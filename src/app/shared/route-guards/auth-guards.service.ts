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

    return this.as.currentUser$.pipe(
      map((val: VerifiedUser) => {
        if (val) {
          return true;
        }
        return this.router.createUrlTree(['/', 'auth','signin']);
      }),
      take(1)
    );
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

    return this.as.currentUser$
    .pipe(
      take(1),
      map((val: VerifiedUser) => {
        if (val) {
          return this.router.createUrlTree(['/', 'my-account']);;
        }
        return true;
      })
    );

    /**
     * Logic:
     * Create a subject that will be returned by this guard to examine TRUE or FALSE.
     * this subject will only emit a value based on the firebase auth async function.
     * Once firebase auth evaluated to a value, call the subject to emit TRUE or FALSE,
     * Then return this subject, with Map to run additional steps for re-direct.
     */
    // let res: Subject<any> = new Subject<any>();
    // firebase.auth().onAuthStateChanged(
    //   (user: firebase.User) => {
    //     if (user) {
    //       res.next(false);
    //     } else {
    //       res.next(true);
    //     }
    //   },
    //   (err) => {
    //     res.next(false);
    //   }
    // );

    // return res.pipe(
    //   take(1),
    //   map((val) => {
    //     if (val) {
    //       return true;
    //     } else {
    //       return this.router.createUrlTree(['/', 'my-account']);
    //     }
    //   })
    // );

    // if (this.as.appAuthHasLoaded) {
    //   //return this.as.currentUser$
    // }

  }
}
