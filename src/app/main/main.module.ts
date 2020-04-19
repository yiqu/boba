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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModuleBundle,
    LoadingSpinnerModule,
    OrderTableNavModule,
    OrderTableIconModule,
    OrderTableUserInfoModule
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
