import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HistoryComponent } from './history.component';

export const routes: Routes = [
  { path: "", component: HistoryComponent }
]

@NgModule({
  imports: [
    RouterModule.forChild(
      routes,
    )
  ],
  exports: [
    RouterModule
  ]
})
export class HistoryRoutingModule {}
