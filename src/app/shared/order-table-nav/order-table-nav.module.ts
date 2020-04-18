import { NgModule } from '@angular/core';
import { OrderTableNavComponent } from './order-table-nav.component';
import { MaterialModuleBundle } from '../material-bundle.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    MaterialModuleBundle,
    CommonModule,
    FormsModule
  ],
  exports: [
    OrderTableNavComponent
  ],
  declarations: [
    OrderTableNavComponent
  ],
  providers: [],
})
export class OrderTableNavModule { }
