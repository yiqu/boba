import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snackbar/snack.component';


@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  sbr: MatSnackBarRef<SnackBarComponent>;

  constructor(private _snackBar: MatSnackBar) {

  }

  openSnackBar(message: string, time: number = 5000) {
    this.sbr = this._snackBar.openFromComponent(SnackBarComponent, {
      duration: time,
      data: message
    });


  }

  closeSnackBar() {
    this.sbr.dismiss();
  }

}
