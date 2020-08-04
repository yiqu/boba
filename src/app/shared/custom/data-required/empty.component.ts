import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-data-required',
  templateUrl: 'empty.component.html',
  styleUrls: ['./empty.component.css']
})
export class DataRequiredComponent implements OnInit {

  title: string = "You have not entered any data.";
  subtitle: string = "Start adding data to...";

  constructor(public router: Router, public route: ActivatedRoute) {

  }

  ngOnInit() {

  }

  goAddNew() {
    this.router.navigate(['/']);
  }
}
