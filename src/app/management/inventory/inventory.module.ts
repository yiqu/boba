import { NgModule } from '@angular/core';
import { InventoryComponent } from './inventory.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModuleBundle } from 'src/app/shared/material-bundle.module';
import { PipeBundleModule } from 'src/app/shared/pipes/pipe-bundle.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModuleBundle,
    PipeBundleModule,
    RouterModule
  ],

  exports: [
    InventoryComponent
  ],

  declarations: [
    InventoryComponent
  ],

  providers: [

  ],
})
export class ManagementInventoryModule { }
