import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { RestDataFireService } from 'src/app/shared/services/fire-data.service';

@Component({
  selector: 'app-main-open',
  templateUrl: 'open.component.html',
  styleUrls: ['./open.component.css']
})
export class MainOpenComponent implements OnInit, AfterViewInit {


  toggleExpandText: string = "Expand all";
  panelsExpanded: boolean = false;


  constructor(public fds: RestDataFireService, private cd: ChangeDetectorRef) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.panelsExpanded = true;
  }

  onSearch(val: string) {
    console.log("searched for: ", val)
  }

  toggleExpand() {
    console.log("toggling")
  }
}
