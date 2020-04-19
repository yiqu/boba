import { NgModule } from '@angular/core';

import { OrderTableIconComponent } from './order-icon.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    OrderTableIconComponent
  ],
  declarations: [
    OrderTableIconComponent
  ],
  providers: [],
})
export class OrderTableIconModule { }
