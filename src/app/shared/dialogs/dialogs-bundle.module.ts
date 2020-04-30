import { NgModule } from '@angular/core';

import { DialogAddUserComponent } from './add-user/add-user.component';
import { MaterialModuleBundle } from '../material-bundle.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogSingleInputComponent } from './single-input/single-input-dialog.component';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm/confirm.component';

@NgModule({
  imports: [
    MaterialModuleBundle,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],

  exports: [
    DialogAddUserComponent,
    DialogSingleInputComponent,
    ConfirmDialogComponent
  ],

  declarations: [
    DialogAddUserComponent,
    DialogSingleInputComponent,
    ConfirmDialogComponent
  ],

  providers: [],
})
export class DialogsModule { }
