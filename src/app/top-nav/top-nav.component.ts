import { Component, OnInit, EventEmitter, Output, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from '../shared/services/cart.service';
import { Subject, timer } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { headShakeAnimation, rotateAnimation, tadaAnimation } from 'angular-animations';

@Component({
  selector: 'app-top-nav',
  templateUrl: 'top-nav.component.html',
  styleUrls: ['./top-nav.component.css'],
  animations: [
    headShakeAnimation(),
    rotateAnimation(),
    tadaAnimation()
  ]
})
export class TopNavComponent implements OnInit, OnDestroy, AfterViewInit {

  headerTitle: string = "BobaShop";
  cartItemsCount: number = 0;
  compDest$: Subject<any> = new Subject<any>();
  logoShakeState: boolean = false;
  leftNavMenuState: boolean = false;
  swingState: boolean = false;

  @Output()
  navToggle: EventEmitter<any> = new EventEmitter<any>();

  constructor(public router: Router, public route: ActivatedRoute,
    public cs: CartService,) {

      this.cs.cartItemList$.pipe(
        takeUntil(this.compDest$)
      )
      .subscribe((val) => {
        this.cartItemsCount = val ? val.length : 0;
      });
  }

  ngOnInit() {
    this.animateLogoOnStart();
  }

  ngAfterViewInit() {
    ;
  }

  onLogoClick() {
    this.logoShakeState = !this.logoShakeState;
  }

  onCartClick() {
    this.router.navigate(['new-order', 'all']);
  }

  onMenuClick() {
    this.leftNavMenuState = !this.leftNavMenuState;
    this.navToggle.emit(true);
  }

  animateLogoOnStart() {
    const logoAnimateTimer = timer(600);
    logoAnimateTimer.pipe(
      take(1)
    ).subscribe((val) => {
      this.swingState = true;
    })
  }

  ngOnDestroy() {
    this.compDest$.next();
  }
}
