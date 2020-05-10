import { NgModule } from '@angular/core';
import { ManagementComponent } from './management.component';
import { ManagementInventoryModule } from './inventory/inventory.module';
import { ManagementRoutingModule } from './management-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PipeBundleModule } from '../shared/pipes/pipe-bundle.module';
import { MaterialModuleBundle } from '../shared/material-bundle.module';
import { DirectivesBundleModule } from '../shared/directives/directives-bundle.module';
import { ArchivesComponent } from './archives/archives.component';
import { UsersComponent } from './users/users.component';
import { NotificationBannerModule } from '../notification-banner/banner.module';
import { LoadingModule } from '../loading/loading.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MaterialModuleBundle,
    PipeBundleModule,
    DirectivesBundleModule,
    ManagementInventoryModule,
    NotificationBannerModule,
    LoadingModule,
    ManagementRoutingModule
  ],

  exports: [
  ],

  declarations: [
    ManagementComponent,
    ArchivesComponent,
    UsersComponent
  ],

  providers: [

  ],
})
export class ManagementModule { }
