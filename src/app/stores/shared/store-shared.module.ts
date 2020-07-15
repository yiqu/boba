import { NgModule } from '@angular/core';
import { StoreCardComponent } from './store-card/store-card.component';
import { MaterialModuleBundle } from '../../shared/material-bundle.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModuleBundle
  ],

  exports: [
    StoreCardComponent
  ],

  declarations: [
    StoreCardComponent
  ],

  providers: [],
})
export class StoreSharedModule { }
