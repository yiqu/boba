import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { RestDataFireService } from 'src/app/shared/services/fire-data.service';
import { Subject } from 'rxjs';
import { OrderAccordionComponent } from 'src/app/shared/order-table-accordion/order-accordion.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-main-closed',
  templateUrl: 'closed.component.html',
  styleUrls: ['./closed.component.css']
})
export class MainClosedComponent implements OnInit {

  @ViewChildren(OrderAccordionComponent)
  ordersAccordionList: QueryList<OrderAccordionComponent>;

  toggleExpandText: string = "Expand all";
  compDestroy$: Subject<any> = new Subject<any>();
  allOrderAccordion: OrderAccordionComponent[] = [];
  ordersExpanded: boolean = false;

  constructor(public fds: RestDataFireService) {

  }

  ngOnInit() { }

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
