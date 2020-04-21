import { NgModule } from '@angular/core';
import { OrderTableComponent } from './order-table.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeBundleModule } from '../pipes/pipe-bundle.module';
import { MaterialModuleBundle } from '../material-bundle.module';
import { LoadingSpinnerModule } from '../loading/loading.module';
import { OrderTableNavModule } from '../order-table-nav/order-table-nav.module';
import { OrderTableIconModule } from '../order-table-icon/order-icon.module';
import { OrderTableUserInfoModule } from '../order-table-user-info/user-label.module';
import { OrderAccordionModule } from '../order-table-accordion/order-accordion.module';
import { OrderDetailDisplayModule } from '../order-detail-display/order-detail-display.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipeBundleModule,
    ReactiveFormsModule,
    MaterialModuleBundle,
    LoadingSpinnerModule,
    OrderTableNavModule,
    OrderTableIconModule,
    OrderTableUserInfoModule,
    OrderAccordionModule,
    OrderDetailDisplayModule
  ],

  exports: [
    OrderTableComponent
  ],

  declarations: [
    OrderTableComponent
  ],

  providers: [],
})
export class OrderTableModule { }
