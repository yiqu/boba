import { Component, OnInit, Input, OnChanges, EventEmitter, Output, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import * as em from '../../error-matchers/error-state.matcher';
import { DialogService } from '../../services/dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../../dialogs/add-user/add-user.component';
import { takeUntil, switchMap } from 'rxjs/operators';
import { RestDataFireService } from '../../services/fire-data.service';
import { SnackbarService } from '../../services/snackbar.service';
import { OrderFormService } from '../order-form.service';
import * as _ from 'lodash';
import { AuthService } from '../../services/auth.service';
import { EMPTY, Subject } from 'rxjs';

@Component({
  selector: 'app-shared-order-form-confirm-desc',
  templateUrl: 'confirm-desc.component.html',
  styleUrls: ['./confirm-desc.component.css']
})
export class ConfirmDescComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  userFc: FormControl;

  @Output()
  fixGoBack: EventEmitter<number> = new EventEmitter<number>();

  users: User[] = [];
  matcher: ErrorStateMatcher = new em.InstantErrorStateMatcher();
  userAddDialogRef: MatDialogRef<DialogAddUserComponent>;
  missingSelectionAlert: string = "Please fix your selections.";
  missingUserName: string = "Please pick a user name";
  compDest$: Subject<any> = new Subject<any>();

  constructor(public us: UserService, public ds: DialogService,
    public rdf: RestDataFireService, public sbs: SnackbarService,
    public ofs: OrderFormService, public as: AuthService) {

  }

  ngOnInit() {

  }

  get showTakeMeThere(): boolean {
    if (this.ofs.fgErrorMsgs.length === 1 &&
      this.ofs.fgErrorMsgs[0] === "User name required") {
        return false;
    }
    return true;
  }

  ngOnChanges() {
  }


  /**
   * OUTDATED
   */
  setDefaultValue() {
    if (this.userFc.value) {
      const i: number = _.findIndex(this.users, ['id', this.userFc.value['id']]);
      if (i > -1) {
        this.userFc.setValue(this.users[i]);
        this.sbs.openSnackBar("Alias for this order has been pre-selected" +
          " to '" + this.userFc.value.display + "'.", 1000);
      } else {
        this.sbs.openSnackBar("Could not find alias '" + this.userFc.value.display +
          "' in your alias list, so no alias has been selected.", 10000);
        this.userFc.reset(null);
      }
    }
  }

  onFixGoBack() {
    let slide: number = null;
    if (this.ofs.orderFg.get("seriesName").invalid) {
      slide = 0;
    } else if (this.ofs.orderFg.get("drinkName").invalid) {
      slide = 1;
    }
    this.fixGoBack.emit(slide);
  }

  ngOnDestroy() {
    this.compDest$.next();
    this.compDest$.complete();
  }



}


