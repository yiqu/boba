import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyAccountComponent } from './my.component';
import { AccountViewComponent } from './view/view.component';
import { AccountEditComponent } from './edit/edit.component';
import { NoVerifiedUserGuard } from '../shared/route-guards/no-user.guard';
import { CanDeactivateGuard } from '../shared/route-guards/can-deactivate.guard';

const routes: Routes = [
  {
    path: '', component: MyAccountComponent, canActivate: [NoVerifiedUserGuard],
    children: [
      { path: '', redirectTo: 'view', pathMatch: 'full' },
      { path: 'view', component: AccountViewComponent },
      { path: 'edit', component: AccountEditComponent, canDeactivate: [CanDeactivateGuard] }
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
