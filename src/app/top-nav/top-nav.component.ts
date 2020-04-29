import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from '../shared/services/cart.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-top-nav',
  templateUrl: 'top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit, OnDestroy {

  headerTitle: string = "BobaShop";
  cartItemsCount: number = 0;
  compDest$: Subject<any> = new Subject<any>();

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

  }

  onCartClick() {
    this.router.navigate(['new-order', 'all']);
  }

  onMenuClick() {
    this.navToggle.emit(true);
  }

  ngOnDestroy() {
    this.compDest$.next();
  }
}
