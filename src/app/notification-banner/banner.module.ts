import { NgModule } from '@angular/core';
import { NotificationBannerComponent } from './banner.component';
import { CommonModule } from '@angular/common';
import { MaterialModuleBundle } from '../shared/material-bundle.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PipeBundleModule } from '../shared/pipes/pipe-bundle.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModuleBundle,
    RouterModule,
    PipeBundleModule
  ],

  exports: [
    NotificationBannerComponent
  ],

  declarations: [
    NotificationBannerComponent
  ],

  providers: [

  ],
})
export class NotificationBannerModule { }
