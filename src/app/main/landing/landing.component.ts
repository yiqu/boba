import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

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

  constructor(public as: AuthService) { }

  ngOnInit() { }
}
