import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { MainOpenComponent } from './main/open/open.component';
import { MainClosedComponent } from './main/closed/closed.component';
import { MainLandingComponent } from './main/landing/landing.component';
import { NotFoundComponent } from './404/404.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: MainComponent,
    children: [
      { path: "", component: MainLandingComponent },
      { path: "open-orders", component: MainOpenComponent },
      { path: "completed-orders", component: MainClosedComponent }
    ]
  },
  { path: 'new-order',
    loadChildren: () => import('./order-new/order-new.module').then(m => m.OrderNewModule)
  },
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
