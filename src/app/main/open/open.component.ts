import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild,
  ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { RestDataFireService } from 'src/app/shared/services/fire-data.service';
import { MatAccordion } from '@angular/material/expansion';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { OrderAccordionComponent } from 'src/app/shared/order-table-accordion/order-accordion.component';

@Component({
  selector: 'app-main-open',
  templateUrl: 'open.component.html',
  styleUrls: ['./open.component.css']
})
export class MainOpenComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren(OrderAccordionComponent)
  ordersAccordionList: QueryList<OrderAccordionComponent>;

  toggleExpandText: string = "Expand all";
  ordersAccordion: MatAccordion;
  ordersExpanded: boolean = false;
  compDestroy$: Subject<any> = new Subject<any>();
  allOrderAccordion: OrderAccordionComponent[] = [];

  constructor(public fds: RestDataFireService) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.ordersAccordionList.changes.pipe(
      takeUntil(this.compDestroy$)
    )
    .subscribe((val: QueryList<OrderAccordionComponent>) => {
      val.forEach((accord: OrderAccordionComponent) => {
        this.allOrderAccordion.push(accord);
      });
    });
  }

  onSearch(val: string) {
    console.log("searched for: ", val)
  }

  toggleExpand() {
    this.allOrderAccordion.forEach((a) => {
      if (this.ordersExpanded) {
        a.collapseAccord();
      } else {
        a.expandAccord();
      }

    })
    this.ordersExpanded = !this.ordersExpanded;
  }

  ngOnDestroy() {
    this.compDestroy$.next();
  }
}
