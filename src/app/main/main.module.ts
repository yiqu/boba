import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModuleBundle } from '../shared/material-bundle.module';
import { MainComponent } from './main.component';
import { MainOpenComponent } from './open/open.component';
import { MainClosedComponent } from './closed/closed.component';
import { RouterModule } from '@angular/router';
import { MainLandingComponent } from './landing/landing.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModuleBundle
  ],

  exports: [

  ],

  declarations: [
    MainComponent,
    MainOpenComponent,
    MainClosedComponent,
    MainLandingComponent
  ],

  providers: [

  ],
})
export class HistoryComponentModule { }
