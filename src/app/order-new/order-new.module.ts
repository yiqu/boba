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
import { AdBannerModule } from '../shared/ad-banner/ad-banner.module';
import { MaterialModuleBundle } from '../shared/material-bundle.module';
import { OrderFormModule } from '../shared/order-form/order-form.module';

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdBannerModule,
    OrderNewRoutingModule,
    OrderFormModule,
    MaterialModuleBundle
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
