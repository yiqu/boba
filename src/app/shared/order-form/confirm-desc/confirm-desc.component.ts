import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import * as em from '../../error-matchers/error-state.matcher';
import { DialogService } from '../../services/dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../../dialogs/add-user/add-user.component';
import { takeUntil } from 'rxjs/operators';
import { RestDataFireService } from '../../services/fire-data.service';
import { SnackbarService } from '../../services/snackbar.service';
import { OrderFormService } from '../order-form.service';

@Component({
  selector: 'app-shared-order-form-confirm-desc',
  templateUrl: 'confirm-desc.component.html',
  styleUrls: ['./confirm-desc.component.css']
})
export class ConfirmDescComponent implements OnInit, OnChanges {

  @Input()
  userFc: FormControl;

  users: User[] = [];
  matcher: ErrorStateMatcher = new em.InstantErrorStateMatcher();
  userAddDialogRef: MatDialogRef<DialogAddUserComponent>;

  constructor(public us: UserService, public ds: DialogService,
    public rdf: RestDataFireService, public sbs: SnackbarService,
    public ofs: OrderFormService) {

  }

  ngOnInit() {

  }

  ngOnChanges() {
    this.us.allUsersr$.pipe(
      takeUntil(this.ofs.refreshComponent$)
    ).subscribe(
      (users: User[]) => {
        this.users = [...users];
      }
    );
  }

  onNameAdd() {
    this.userAddDialogRef = this.ds.getUserAddDialog();
    this.userAddDialogRef.afterClosed().pipe(
      takeUntil(this.ofs.refreshComponent$)
    )
    .subscribe((val: User) => {
      if (val) {
        this.us.usersListFDB.push(val).then(
          (val) => this.onPushComplete(val),
          (er) => {
          }
        );
      }
    });
  }

  onPushComplete(val: any) {
    this.sbs.openSnackBar("User added!")
  }

}


