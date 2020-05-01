import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagementComponent } from './management.component';
import { InventoryComponent } from './inventory/inventory.component';
import { UsersComponent } from './users/users.component';
import { ArchivesComponent } from './archives/archives.component';

const routes: Routes = [
  {
    path: '', component: ManagementComponent,
    children: [
      { path: '', redirectTo: 'inventory', pathMatch: 'full' },
      { path: 'inventory', component: InventoryComponent },
      { path: 'users', component: UsersComponent },
      { path: 'archives', component: ArchivesComponent }
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
export class ManagementRoutingModule { }
