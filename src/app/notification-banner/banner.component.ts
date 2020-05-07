import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { VerifiedUser } from '../shared/models/user.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-notification-banner',
  templateUrl: 'banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class NotificationBannerComponent implements OnInit, OnChanges {

  @Input()
  alwaysShow: boolean = false;

  @Input()
  customMsg: string = ".";

  @Input()
  loginRequired: boolean;

  @Input()
  adminRequired: boolean;

  @Input()
  showBreak: boolean = false;

  currentUser: VerifiedUser;
  message: string;
  show: boolean = false;
  listOfAdmins: VerifiedUser[] = [];
  compDest$: Subject<any> = new Subject<any>();

  constructor(public as: AuthService) {
    this.as.currentUser$.pipe(
      takeUntil(this.compDest$)
    )
    .subscribe((u) => {
      this.currentUser = u;
      this.getMessage();
    });
  }

  ngOnInit() {
  }

  ngOnChanges(c) {
    this.getMessage();
  }

  getMessage(): void {
    if (this.alwaysShow) {
      this.show = true;
      this.message = this.customMsg;
      return;
    } else if (this.adminRequired) {
      let i: number = -1;
      i = this.listOfAdmins.findIndex((a: VerifiedUser) => {
        return this.currentUser ? a.email === this.currentUser.email : false;
      });
      this.show = (i > -1) ?  false : true;
      this.message = "Only admins are allowed to make edits and changes.";
      return;
    } else if (this.loginRequired) {
      this.show = this.currentUser ? false : true;
      this.message = "Please login " + this.customMsg;
      return;
    }

  }
}
