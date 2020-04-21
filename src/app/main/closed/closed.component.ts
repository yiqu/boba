import { Component, OnInit, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { RestDataFireService } from 'src/app/shared/services/fire-data.service';
import { Subject } from 'rxjs';
import { OrderAccordionComponent } from 'src/app/shared/order-table-accordion/order-accordion.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-main-closed',
  templateUrl: 'closed.component.html',
  styleUrls: ['./closed.component.css']
})
export class MainClosedComponent implements OnInit, OnDestroy {


  constructor(public fds: RestDataFireService) {

  }

  ngOnInit() {

  }

  onSearch(searchVal: string) {
    console.log(searchVal)
  }


  ngOnDestroy() {
  }
}
