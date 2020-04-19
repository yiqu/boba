import { NgModule } from '@angular/core';
import { OrderTableUserInfoComponent } from './user-label.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [OrderTableUserInfoComponent],
  declarations: [OrderTableUserInfoComponent],
  providers: [],
})
export class OrderTableUserInfoModule { }
