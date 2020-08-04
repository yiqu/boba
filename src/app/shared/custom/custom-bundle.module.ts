import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModuleBundle } from '../material-bundle.module';
import { PipeBundleModule } from '../pipes/pipe-bundle.module';
import { RouterModule } from '@angular/router';
import { DialogConfirmComponent } from './dialog/dialog.component';
import { LoadingModule } from '../../loading/loading.module';
import { DataRequiredComponent } from './data-required/empty.component';
import { TableModule } from './table/table.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModuleBundle,
    PipeBundleModule,
    RouterModule,
    LoadingModule,
    TableModule,
  ],

  exports: [
    DataRequiredComponent,
    DialogConfirmComponent,
  ],

  declarations: [
    DataRequiredComponent,
    DialogConfirmComponent,
  ],

  providers: [

  ],
})
export class CustomComponentsModule { }
