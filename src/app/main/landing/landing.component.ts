import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-m-landing',
  templateUrl: 'landing.component.html',
  styleUrls: ['./landing.component.css']
})

export class MainLandingComponent implements OnInit {

  bgUrl: string = "assets/images/bg/new-order-bg.jpg";

  homeBannerText: string = "Welcome to k.q's boba shop."

  homeBannerSub: string = "We are always working hard to " +
  "serve you the most delicious boba tea!";

  constructor() { }

  ngOnInit() { }
}
