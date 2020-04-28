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
import { PipeBundleModule } from '../shared/pipes/pipe-bundle.module';
import { OrderDetailDisplayModule } from '../shared/order-detail-display/order-detail-display.module';
import { OrderAccordionModule } from '../shared/order-table-accordion/order-accordion.module';
import { OrderTableUserInfoModule } from '../shared/order-table-user-info/user-label.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutItemsDisplayModule } from '../shared/checkout-items-display/checkout-items-display.module';
import { DeliveryModule } from '../shared/delivery-info/delivery.module';
import { PaymentModule } from '../shared/payment-info/payment.module';
import { OrderNewFavListComponent } from './create/favorite-list/fav-list.component';
import { DirectivesBundleModule } from '../shared/directives/directives-bundle.module';

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdBannerModule,
    OrderNewRoutingModule,
    OrderFormModule,
    MaterialModuleBundle,
    PipeBundleModule,
    OrderDetailDisplayModule,
    OrderAccordionModule,
    OrderTableUserInfoModule,
    CheckoutItemsDisplayModule,
    DeliveryModule,
    PaymentModule,
    DirectivesBundleModule
  ],

  exports: [

  ],

  declarations: [
    OrderNewComponent,
    OrderNewOrderComponent,
    OrderNewViewAllComponent,
    OrderNewCreateComponent,
    CheckoutComponent,
    OrderNewFavListComponent
  ],

  providers: [

  ],
})
export class OrderNewModule { }
