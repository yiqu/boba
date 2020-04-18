import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  headerTitle: string = "BobaShop";
  footerTitle: string = "@KQ 2020";

  constructor() {

  }
}
