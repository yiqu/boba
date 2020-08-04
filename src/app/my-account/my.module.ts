import { NgModule } from '@angular/core';
import { MyAccountComponent } from './my.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModuleBundle } from '../shared/material-bundle.module';
import { AccountRoutingModule } from './my-routing.module';
import { AccountViewComponent } from './view/view.component';
import { AccountEditComponent } from './edit/edit.component';
import { PipeBundleModule } from '../shared/pipes/pipe-bundle.module';
import { LoadingSpinnerModule } from '../shared/loading/loading.module';
import { CustomComponentsModule } from '../shared/custom/custom-bundle.module';
import { LoadingModule } from '../loading/loading.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModuleBundle,
    PipeBundleModule,
    LoadingSpinnerModule,
    CustomComponentsModule,
    LoadingModule,
    AccountRoutingModule,
  ],
  exports: [

  ],
  declarations: [
    MyAccountComponent,
    AccountViewComponent,
    AccountEditComponent
  ],

  providers: [

  ],
})
export class MyAccountModule { }
