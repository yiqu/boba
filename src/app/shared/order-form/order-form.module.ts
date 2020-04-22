import { NgModule } from '@angular/core';
import { OrderFormComponent } from './order-form.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModuleBundle } from '../material-bundle.module';
import { PipeBundleModule } from '../pipes/pipe-bundle.module';
import { SeriesDescComponent } from './series-desc/series-desc.component';
import { DrinkDescComponent } from './drink-desc/drink-desc.component';
import { SettingsDescComponent } from './settings-desc/settings-desc.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModuleBundle,
    PipeBundleModule
  ],

  exports: [
    OrderFormComponent
  ],

  declarations: [
    OrderFormComponent,
    SeriesDescComponent,
    DrinkDescComponent,
    SettingsDescComponent
  ],

  providers: [

  ],
})
export class OrderFormModule { }
