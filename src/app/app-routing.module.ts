import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { MainOpenComponent } from './main/open/open.component';
import { MainClosedComponent } from './main/closed/closed.component';
import { MainLandingComponent } from './main/landing/landing.component';
import { NotFoundComponent } from './404/404.component';
import { NetworkAwarePreloadStrategy } from './shared/preload-strategies/preload-network';
import { AuthUserResolver } from './shared/resolver/auth-resolver.service';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: MainComponent,
    //resolve: {verifiedUser: AuthUserResolver},
    children: [
      { path: "", component: MainLandingComponent, data: {title: 'Home'} },
      { path: "open-orders", component: MainOpenComponent,  data: {title: 'Working'} },
      { path: "completed-orders", component: MainClosedComponent,  data: {title: 'Delivered'} }
    ]
  },
  { path: 'new-order',
    loadChildren: () => import('./order-new/order-new.module').then(m => m.OrderNewModule)
  },
  { path: 'management',
    loadChildren: () => import('./management/management.module').then(m => m.ManagementModule)
  },
  { path: 'auth',
    loadChildren: () => import('./authentication/auth.module').then(m => m.AuthModule)
  },
  { path: 'my-account',
    loadChildren: () => import('./my-account/my.module').then(m => m.MyAccountModule)
  },
  {
    path: 'new-customer',
    loadChildren: () => import('./new-customer/new-customer.module').then(m => m.NewCustomerModule)
  },
  {
    path: 'stores',
    loadChildren: () => import('./stores/stores.module').then(m => m.StoresModule)
  },
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      {
        preloadingStrategy: NetworkAwarePreloadStrategy,
        //scrollPositionRestoration: "top"
      }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
