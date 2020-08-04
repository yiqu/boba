import { NgModule } from '@angular/core';
import { TableComponent } from './table.component';
import { MaterialModuleBundle } from '../../material-bundle.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PipeBundleModule } from '../../pipes/pipe-bundle.module';


@NgModule({
  imports: [
    MaterialModuleBundle,
    FormsModule,
    CommonModule,
    PipeBundleModule
  ],
  exports: [
    TableComponent
  ],

  declarations: [
    TableComponent
  ],

  providers: [
  ],
})
export class TableModule { }
