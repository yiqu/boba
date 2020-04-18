import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { MainOpenComponent } from './main/open/open.component';
import { MainClosedComponent } from './main/closed/closed.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: MainComponent,
    children: [
      { path: "open-orders", component: MainOpenComponent },
      { path: "completed-orders", component: MainClosedComponent }
    ]
  }
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
