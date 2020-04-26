import { NgModule } from '@angular/core';
import { CheckoutItemsDisplayComponent } from './checkout-items-display.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PipeBundleModule } from '../pipes/pipe-bundle.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    PipeBundleModule
  ],

  exports: [
    CheckoutItemsDisplayComponent
  ],

  declarations: [
    CheckoutItemsDisplayComponent
  ],

  providers: [

  ],
})
export class CheckoutItemsDisplayModule { }
