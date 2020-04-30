import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogSingleInputComponent, DialogSingleInputData } from '../single-input/single-input-dialog.component';

@Component({
  selector: 'app-shared-dialogs-confirm',
  templateUrl: 'confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  title: string = "";

  constructor(public dialogRef: MatDialogRef<DialogSingleInputComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogConfirmData) {
      this.title = data.title;
  }

  ngOnInit() {

  }

  onSubmit() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}


export class DialogConfirmData {
  constructor(public title: string) {

  }
}
