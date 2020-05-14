import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewCustomerComponent } from './new-customer.component';

const routes: Routes = [
  { path: '', component: NewCustomerComponent, data: {title: 'New Customer'} }
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
export class NewCustomerRoutingModule { }
