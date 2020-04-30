import { Component, OnInit, Input, ViewChild, AfterContentInit, AfterViewInit, EventEmitter, Output, OnChanges } from '@angular/core';
import { DrinkOrder } from '../models/tea.models';
import { MatAccordion } from '@angular/material/expansion';
import { MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent, DialogConfirmData } from '../dialogs/confirm/confirm.component';
import { DialogService } from '../services/dialog.service';


/**
 * Drink order details accordian display
 */
@Component({
  selector: 'app-shared-order-accordion',
  templateUrl: 'order-accordion.component.html',
  styleUrls: ['./order-accordion.component.css']
})

export class OrderAccordionComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild(MatAccordion)
  matAccord: MatAccordion;

  @Input()
  drinkOrder: DrinkOrder;

  @Input()
  hideToggle: boolean = false;

  @Input()
  startAsCollapsed: boolean = false;

  @Input()
  editable: boolean = false;

  @Output()
  orderEdit: EventEmitter<DrinkOrder> = new EventEmitter<DrinkOrder>();

  @Output()
  orderRemove: EventEmitter<DrinkOrder> = new EventEmitter<DrinkOrder>();

  panelsExpanded: boolean = true;
  confirmDeleteDialogRef: MatDialogRef<ConfirmDialogComponent>;

  constructor(public ds: DialogService) {

  }

  ngOnChanges(c) {
    console.log("in o", this.drinkOrder)
  }

  ngOnInit() {
    if (this.startAsCollapsed) {
      this.panelsExpanded = false;
    }
  }

  ngAfterViewInit() {
    if (this.startAsCollapsed) {
      this.collapseAccord();
    }
  }

  collapseAccord() {
    this.matAccord.closeAll();
  }

  expandAccord() {
    this.matAccord.openAll();
  }

  onEditOrderClick(i: number, remove: boolean) {
    if (remove) {
      const conf: DialogConfirmData = new DialogConfirmData("Are you sure you want to remove this item?");
      const dia = this.ds.getConfirmDialog(conf);
      dia.afterClosed().subscribe((val) => {
        if (val) {
          this.orderRemove.emit(this.drinkOrder.groupedOrders[i]);
        }
      });
    } else {
      this.orderEdit.emit(this.drinkOrder.groupedOrders[i]);
    }

  }
}
