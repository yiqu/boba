import { NgModule } from '@angular/core';
import { InventoryComponent } from './inventory.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModuleBundle } from 'src/app/shared/material-bundle.module';
import { PipeBundleModule } from 'src/app/shared/pipes/pipe-bundle.module';
import { RouterModule } from '@angular/router';
import { InventoryDrinkDetailComponent } from './drink-detail/drink-detail.component';

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
  ],

  declarations: [
    InventoryComponent,
    InventoryDrinkDetailComponent
  ],

  providers: [

  ],
})
export class ManagementInventoryModule { }
