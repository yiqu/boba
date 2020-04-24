import { NgModule } from '@angular/core';

import { DialogAddUserComponent } from './add-user/add-user.component';
import { MaterialModuleBundle } from '../material-bundle.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    MaterialModuleBundle,
    ReactiveFormsModule,
    FormsModule
  ],

  exports: [
    DialogAddUserComponent
  ],

  declarations: [
    DialogAddUserComponent
  ],

  providers: [],
})
export class DialogsModule { }
