import { Component, Inject, OnInit, OnDestroy, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as fu from '../../utils/form.utils';
import { User } from '../../models/user.model';
import { ErrorStateMatcher } from '@angular/material/core';
import * as em from '../../error-matchers/error-state.matcher';

@Component({
  selector: 'dialog-single-input',
  templateUrl: 'single-input-dialog.component.html',
  styleUrls: ['single-input-dialog.component.css'],
})
export class DialogSingleInputComponent implements OnInit, OnDestroy {

  matcher: ErrorStateMatcher = new em.AfterActionsErrorStateMatcher();
  inputFc = new FormControl();

  inputModel: string;

  constructor(public dialogRef: MatDialogRef<DialogSingleInputComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogSingleInputData, public fb: FormBuilder) {
     this.inputModel = (this.data.initValue);
     this.inputFc = fu.createFormControl(data.initValue, false, [Validators.required]);
  }

  ngOnInit() {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const val = this.inputFc.value;
    if (this.inputFc.valid) {
      this.dialogRef.close(val);
    }
  }

  ngOnDestroy() {
  }

}

export class DialogSingleInputData {
  constructor(public title: string, public label: string, public initValue: string,
    public inputIcon: string, public hint: string) {

  }
}
