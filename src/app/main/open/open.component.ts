import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild,
  ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { RestDataFireService } from 'src/app/shared/services/fire-data.service';
import { MatAccordion } from '@angular/material/expansion';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-main-open',
  templateUrl: 'open.component.html',
  styleUrls: ['./open.component.css']
})
export class MainOpenComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren(MatAccordion)
  ordersAccordionList: QueryList<MatAccordion>;

  toggleExpandText: string = "Expand all";
  panelsExpanded: boolean = true;
  ordersAccordion: MatAccordion;
  ordersExpanded: boolean = false;
  compDestroy$: Subject<any> = new Subject<any>();

  constructor(public fds: RestDataFireService, private cd: ChangeDetectorRef) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.ordersAccordionList.changes.pipe(
      takeUntil(this.compDestroy$)
    )
    .subscribe((val: QueryList<MatAccordion>) => {
      console.log(val)
    });
  }

  onSearch(val: string) {
    console.log("searched for: ", val)
  }

  toggleExpand() {
    //this.ordersExpanded ? (this.ordersAccordion.closeAll()) : (this.ordersAccordion.openAll());
    //this.ordersExpanded = !this.ordersExpanded;
  }

  ngOnDestroy() {
    this.compDestroy$.next();
  }
}
