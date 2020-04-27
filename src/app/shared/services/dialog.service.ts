import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialogs/add-user/add-user.component';
import { User } from '../models/user.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DrinkFavorite } from '../models/base.model';
import { DrinkFavoriteItem } from '../models/tea.models';
import { DialogSingleInputComponent, DialogSingleInputData } from '../dialogs/single-input/single-input-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  dialogRef: MatDialogRef<any>;
  compDest$: Subject<any> = new Subject<any>();


  constructor(public dialog: MatDialog) {

  }

  /**
   * Return a dialog Ref to subscribe to
   */
  getUserAddDialog(user?: User): MatDialogRef<DialogAddUserComponent> {
    return this.dialog.open(DialogAddUserComponent, {
      minWidth: '250px',
      data: user,
      disableClose: false,
      autoFocus: true
    });
  }

  getFavDrinkAddDialog(data: DialogSingleInputData): MatDialogRef<DialogSingleInputComponent> {
    return this.dialogRef = this.dialog.open(DialogSingleInputComponent, {
      minWidth: '250px',
      data: data,
      disableClose: false
    });
  }

}
