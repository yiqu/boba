import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-account-view',
  templateUrl: 'view.component.html',
  styleUrls: ['./view.component.css']
})
export class AccountViewComponent implements OnInit {

  viewSubtext: string = "My account information";
  defaultAvartarImgSrc: string = "assets/images/main/user/signin-avatar-default.png";

  constructor(public as: AuthService) {

  }

  ngOnInit() {

  }
}
