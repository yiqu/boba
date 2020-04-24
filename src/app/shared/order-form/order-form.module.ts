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
import { ToppingDescComponent } from './topping-desc/topping-desc.component';
import { OrderDetailDisplayModule } from '../order-detail-display/order-detail-display.module';
import { ConfirmDescComponent } from './confirm-desc/confirm-desc.component';
import { DialogsModule } from '../dialogs/dialogs-bundle.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModuleBundle,
    PipeBundleModule,
    OrderDetailDisplayModule,
    DialogsModule
  ],

  exports: [
    OrderFormComponent
  ],

  declarations: [
    OrderFormComponent,
    SeriesDescComponent,
    DrinkDescComponent,
    SettingsDescComponent,
    ToppingDescComponent,
    ConfirmDescComponent
  ],

  providers: [

  ],
})
export class OrderFormModule { }
