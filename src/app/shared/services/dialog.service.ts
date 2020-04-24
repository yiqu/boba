import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialogs/add-user/add-user.component';
import { User } from '../models/user.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  dialogRef: MatDialogRef<DialogAddUserComponent>;
  compDest$: Subject<any> = new Subject<any>();

  constructor(public dialog: MatDialog) {

  }

  openUserAddDialog(user?: User): void {
    this.dialogRef = this.dialog.open(DialogAddUserComponent, {
      minWidth: '250px',
      data: user,
      disableClose: false
    });

    this.dialogRef.afterClosed().pipe(
      takeUntil(this.compDest$)
    ).subscribe(
      (val) => {

      }
    )

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

}
