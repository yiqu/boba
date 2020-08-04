import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoresComponent } from './stores.component';
import { StoresLandingComponent } from './stores-landing/landing.component';
import { StoresCreateComponent } from './creation/create.component';

const routes: Routes = [
  {
    path: '', component: StoresComponent,
    children: [
      { path: '', redirectTo: 'select', pathMatch: 'full' },
      { path: 'select', component: StoresLandingComponent },
      { path: 'create', component: StoresCreateComponent }
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
export class StoresRoutingModule { }
