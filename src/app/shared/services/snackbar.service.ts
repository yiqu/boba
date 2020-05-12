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

  openSnackBar(message: string, time: number = 4000, type?: string) {
    let pClass: string;
    switch (type) {
      case "success": {
        pClass = "sb-success";
        break;
      }
      case "danger": {
        pClass = "sb-danger";
        break;
      }
    }
    this.sbr = this._snackBar.openFromComponent(SnackBarComponent, {
      duration: time,
      data: message,
      panelClass: pClass
    });
  }

  closeSnackBar() {
    this.sbr.dismiss();
  }

}
