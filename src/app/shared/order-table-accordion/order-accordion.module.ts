import { NgModule } from '@angular/core';
import { OrderAccordionComponent } from './order-accordion.component';
import { MaterialModuleBundle } from '../material-bundle.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderTableIconModule } from '../order-table-icon/order-icon.module';
import { OrderDetailDisplayModule } from '../order-detail-display/order-detail-display.module';
import { PipeBundleModule } from '../pipes/pipe-bundle.module';

@NgModule({
  imports: [
    MaterialModuleBundle,
    CommonModule,
    FormsModule,
    OrderTableIconModule,
    OrderDetailDisplayModule,
    PipeBundleModule
  ],

  exports: [
    OrderAccordionComponent
  ],

  declarations: [
    OrderAccordionComponent
  ],

  providers: [],
})
export class OrderAccordionModule { }
