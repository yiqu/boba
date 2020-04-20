import { NgModule } from '@angular/core';
import { OrderDetailDisplayComponent } from './order-detail-display.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModuleBundle } from '../material-bundle.module';
import { PipeBundleModule } from '../pipes/pipe-bundle.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModuleBundle,
    PipeBundleModule
  ],

  exports: [
    OrderDetailDisplayComponent
  ],

  declarations: [
    OrderDetailDisplayComponent
  ],

  providers: [],
})
export class OrderDetailDisplayModule { }
