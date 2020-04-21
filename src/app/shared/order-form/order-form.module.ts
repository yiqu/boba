import { NgModule } from '@angular/core';
import { OrderFormComponent } from './order-form.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModuleBundle } from '../material-bundle.module';
import { PipeBundleModule } from '../pipes/pipe-bundle.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModuleBundle,
    PipeBundleModule
  ],

  exports: [
    OrderFormComponent
  ],

  declarations: [
    OrderFormComponent
  ],

  providers: [

  ],
})
export class OrderFormModule { }
