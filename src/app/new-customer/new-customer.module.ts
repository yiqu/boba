import { NgModule } from '@angular/core';

import { NewCustomerComponent } from './new-customer.component';
import { NewCustomerRoutingModule } from './new-customer-routing.module';
import { MaterialModuleBundle } from '../shared/material-bundle.module';
import { PipeBundleModule } from '../shared/pipes/pipe-bundle.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({

  imports: [
    MaterialModuleBundle,
    PipeBundleModule,
    CommonModule,
    FormsModule,
    NewCustomerRoutingModule
  ],

  exports: [],

  declarations: [
    NewCustomerComponent
  ],

  providers: [

  ],

})
export class NewCustomerModule { }
