import { Component, OnInit, Input, OnDestroy, ViewChildren, QueryList,
  Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DrinkOrder } from '../models/tea.models';
import { OrderAccordionComponent } from '../order-table-accordion/order-accordion.component';
import { MatAccordion } from '@angular/material/expansion';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-shared-order-table',
  templateUrl: 'order-table.component.html',
  styleUrls: ['./order-table.component.css']
})
export class OrderTableComponent implements OnInit, OnDestroy {

  @ViewChildren(OrderAccordionComponent)
  ordersAccordionList: QueryList<OrderAccordionComponent>;

  @Input()
  drinkOrderObs: Observable<DrinkOrder[]>;

  @Output()
  searchOutput: EventEmitter<string> = new EventEmitter<string>();

  toggleExpandText: string = "";
  ordersAccordion: MatAccordion;
  ordersExpanded: boolean = false;
  compDestroy$: Subject<any> = new Subject<any>();
  allOrderAccordion: OrderAccordionComponent[] = [];

  constructor() {

  }

  ngOnInit() {
    this.toggleExpandText = this.ordersExpanded ? "Collapse all" : "Expand all";
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
    this.searchOutput.emit(val);
  }

  toggleExpand() {
    this.allOrderAccordion.forEach((a) => {
      if (this.ordersExpanded) {
        a.collapseAccord();
        this.toggleExpandText = "Expand all";
      } else {
        a.expandAccord();
        this.toggleExpandText = "Collapse all";
      }

    })
    this.ordersExpanded = !this.ordersExpanded;
  }

  ngOnDestroy() {
    this.compDestroy$.next();
  }
}
