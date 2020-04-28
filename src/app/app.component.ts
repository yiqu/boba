import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from './shared/services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  headerTitle: string = "BobaShop";
  footerTitle: string = "@KQ 2020";
  cartItemsCount: number = 0;
  myUrl: string = "https://yiqu.github.io/";

  constructor(public router: Router, public route: ActivatedRoute,
    public cs: CartService) {
      this.cs.cartItemList$.subscribe((val) => {
        this.cartItemsCount = val ? val.length : 0;
      })
  }

  onCartClick() {
    this.router.navigate(['new-order', 'all']);
  }
}
