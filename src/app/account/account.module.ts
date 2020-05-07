import { NgModule } from '@angular/core';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeBundleModule } from '../shared/pipes/pipe-bundle.module';
import { MaterialModuleBundle } from '../shared/material-bundle.module';
import { AccountEditComponent } from './edit/edit.component';
import { AccountViewComponent } from './view/view.component';
import { LoadingSpinnerModule } from '../shared/loading/loading.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PipeBundleModule,
    MaterialModuleBundle,
    LoadingSpinnerModule,
    AccountRoutingModule
  ],

  exports: [

  ],

  declarations: [
    AccountComponent,
    AccountViewComponent,
    AccountEditComponent
  ],

  providers: [

  ],
})
export class AccountModule { }
