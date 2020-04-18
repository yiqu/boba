import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-shared-order-table-nav',
  templateUrl: 'order-table-nav.component.html',
  styleUrls: ['./order-table-nav.component.css']
})

export class OrderTableNavComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('searchInput')
  searchInput: ElementRef;

  @Input()
  colorPallet: string = undefined;

  @Input()
  noPadding: boolean = false;

  @Output()
  searchedVal: EventEmitter<string> = new EventEmitter<string>();

  searchVal: string;
  compDestroy$: Subject<any> = new Subject<any>();

  constructor() {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    fromEvent(this.searchInput.nativeElement, 'input').pipe(
      takeUntil(this.compDestroy$),
      debounceTime(500),
      distinctUntilChanged(),
      // filter((val: any) => {
      //   if (val?.target?.value) {
      //     return val.target.value.trim() !== "";
      //   }
      // }),
      map((val: any) => {
        return val?.target?.value?.trim();
      })
    ).subscribe((val) => {
      this.searchedVal.emit(val);
    })
  }

  ngOnDestroy() {
    this.compDestroy$.next();
  }

}
