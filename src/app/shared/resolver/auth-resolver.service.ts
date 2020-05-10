import { Resolve, ActivatedRouteSnapshot, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { delay, map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';
import 'firebase/auth';

Injectable({
  providedIn: 'root'
})
export class AuthUserResolver implements Resolve<any> {
  constructor() {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<firebase.User> | firebase.User {
    let res: Subject<firebase.User> = new Subject<firebase.User>();
    firebase.auth().onAuthStateChanged(
      (user: firebase.User) => {
        if (user) {
          res.next(user);
        } else {
          res.next(null);
        }
      },
      (err) => {
        res.next(null);
      }
    );

    return res.pipe(take(1));
  }
}
