import {Component, Inject} from '@angular/core';
import {MatSnackBar, MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';

@Component({
  selector: 'snack-bar-component',
  templateUrl: 'snack.component.html',
  styleUrls: ['./snack.component.css'],
})
export class SnackBarComponent {

  displayMessage: string;

  constructor(public sbr: MatSnackBarRef<SnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.displayMessage = data;
  }

  onClose() {
    this.sbr.dismiss();
  }
}
