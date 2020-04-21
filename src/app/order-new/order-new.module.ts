import { NgModule } from '@angular/core';
import { OrderNewComponent } from './order-new.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { OrderNewRoutingModule } from './order-routing.module';
import { OrderNewOrderComponent } from './order/order.component';
import { OrderNewViewAllComponent } from './view-all/view-all.component';
import { OrderNewCreateComponent } from './create/create.component';

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    OrderNewRoutingModule
  ],

  exports: [

  ],

  declarations: [
    OrderNewComponent,
    OrderNewOrderComponent,
    OrderNewViewAllComponent,
    OrderNewCreateComponent
  ],

  providers: [

  ],
})
export class OrderNewModule { }
