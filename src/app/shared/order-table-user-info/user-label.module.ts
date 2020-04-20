import { NgModule } from '@angular/core';
import { OrderTableUserInfoComponent } from './user-label.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PipeBundleModule } from '../pipes/pipe-bundle.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipeBundleModule
  ],
  exports: [OrderTableUserInfoComponent],
  declarations: [OrderTableUserInfoComponent],
  providers: [],
})
export class OrderTableUserInfoModule { }
