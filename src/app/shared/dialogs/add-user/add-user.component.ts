import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as fu from '../../utils/form.utils';
import { User } from '../../models/user.model';

@Component({
  selector: 'dialog-add-user',
  templateUrl: 'add-user.component.html',
  styleUrls: ['add-user.component.css'],
})
export class DialogAddUserComponent implements OnInit, OnDestroy {
  userFg: FormGroup = new FormGroup({});

  get userNameFc(): FormControl {
    return <FormControl>this.userFg.get("userName");
  }

  get userIdFc(): FormControl {
    return <FormControl>this.userFg.get("userId");
  }


  constructor( public dialogRef: MatDialogRef<DialogAddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public fb: FormBuilder) {
     // let initUserData = data;
  }

  ngOnInit() {
    this.userFg = this.fb.group({
      userName: fu.createFormControl(null, false, [Validators.required]),
      userId: fu.createFormControl(null, false)
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const id: string = this.trimAndReplace(this.userFg.value.userName);
    const user = new User(id, this.userFg.value.userName);
    this.dialogRef.close(user);
  }

  ngOnDestroy() {
    console.log("dialog destoryed")
  }

  trimAndReplace(val: string) {
    if (val) {
      return val.trim().split(" ").join("");
    }
  }

}
