import { NgModule } from '@angular/core';
import { StoresComponent } from './stores.component';
import { StoresLandingComponent } from './stores-landing/landing.component';
import { StoresRoutingModule } from './stores-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModuleBundle } from '../shared/material-bundle.module';
import { StoresCreateComponent } from './creation/create.component';
import { LoadingModule } from '../loading/loading.module';
import { StoreSharedModule } from './shared/store-shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModuleBundle,
    LoadingModule,
    StoreSharedModule,
    StoresRoutingModule
  ],

  exports: [

  ],

  declarations: [
    StoresComponent,
    StoresCreateComponent,
    StoresLandingComponent
  ],

  providers: [
  ],

})
export class StoresModule { }
