import { Resolve, ActivatedRouteSnapshot, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

Injectable({
  providedIn: 'root'
})
export class DataResolver implements Resolve<unknown> {
  constructor(public as: AuthService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<unknown> | unknown {
    return this.as.authStateResolved$;
  }
}
