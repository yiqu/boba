import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderNewComponent } from './order-new.component';
import { OrderNewOrderComponent } from './order/order.component';
import { OrderNewCreateComponent } from './create/create.component';
import { OrderNewViewAllComponent } from './view-all/view-all.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutRouteGuard } from '../shared/route-guards/checkout-guard.service';

const routes: Routes = [
  {
    path: '', component: OrderNewComponent, data: {title: 'New Order'},
    children: [
      { path: '', redirectTo: 'new', pathMatch: 'full' },
      { path: 'new', component: OrderNewCreateComponent },
      { path: 'checkout', component: CheckoutComponent, canActivate: [CheckoutRouteGuard] },
      { path: 'all', component: OrderNewViewAllComponent,
        children: [
          { path: ':id', component: OrderNewOrderComponent }
        ]
      }
    ]
  }
];


/**
 * Routing module.
 */
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],

  exports: [
    RouterModule
  ],

  declarations: []
})
export class OrderNewRoutingModule { }
