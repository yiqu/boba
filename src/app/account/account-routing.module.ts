import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account.component';
import { AccountEditComponent } from './edit/edit.component';
import { AccountViewComponent } from './view/view.component';
import { AuthUserChildrenGuard } from '../shared/route-guards/auth-guards.service';

const routes: Routes = [
  {
    path: '', component: AccountComponent, canActivateChild: [AuthUserChildrenGuard],
    children: [
      { path: '', redirectTo: 'view', pathMatch: 'full' },
      { path: 'view', component: AccountViewComponent },
      { path: 'edit', component: AccountEditComponent }
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
export class AccountRoutingModule { }
