import { NgModule } from '@angular/core';

import { SnackBarComponent } from './snack.component';
import { MaterialModuleBundle } from '../material-bundle.module';

@NgModule({
  imports: [MaterialModuleBundle],
  exports: [SnackBarComponent],
  declarations: [SnackBarComponent],
  providers: [],
})
export class SnackModule { }
