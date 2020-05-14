import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-customer',
  templateUrl: 'new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {

  title: string = "Please login with your BobaShop account, or register for one if you have not done so!";
  imgUrl: string = "/assets/images/main/icons/login-first.jpg";

  constructor(public router: Router, public route: ActivatedRoute) {
  }

  ngOnInit() {

  }

  onClick(res: string) {
    if (res === 'login') {
      this.router.navigate(['/', 'auth', 'signin']);
    } else {
      this.router.navigate(['/', 'auth', 'signup']);
    }
  }
}
