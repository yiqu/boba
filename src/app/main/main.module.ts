import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModuleBundle } from '../shared/material-bundle.module';
import { MainComponent } from './main.component';
import { MainOpenComponent } from './open/open.component';
import { MainClosedComponent } from './closed/closed.component';
import { RouterModule } from '@angular/router';
import { MainLandingComponent } from './landing/landing.component';
import { LoadingSpinnerModule } from '../shared/loading/loading.module';
import { OrderTableNavModule } from '../shared/order-table-nav/order-table-nav.module';
import { OrderTableIconModule } from '../shared/order-table-icon/order-icon.module';
import { OrderTableUserInfoModule } from '../shared/order-table-user-info/user-label.module';
import { PipeBundleModule } from '../shared/pipes/pipe-bundle.module';
import { OrderAccordionModule } from '../shared/order-table-accordion/order-accordion.module';
import { OrderDetailDisplayModule } from '../shared/order-detail-display/order-detail-display.module';
import { OrderTableModule } from '../shared/order-table/order-table.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    OrderTableModule,
    PipeBundleModule,
    ReactiveFormsModule,
    MaterialModuleBundle,
  ],

  exports: [

  ],

  declarations: [
    MainComponent,
    MainOpenComponent,
    MainClosedComponent,
    MainLandingComponent
  ],

  providers: [

  ],
})
export class MainComponentModule { }
