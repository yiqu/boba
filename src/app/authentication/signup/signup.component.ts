import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as fu from '../../shared/utils/form.utils';
import { AuthInfo, IAuthInfo } from '../../shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-auth-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class AuthSignupComponent implements OnInit {

  signInTitle: string = "Create your BobaShop Account.";
  avartarImgSrc: string = "assets/images/main/user/signin-avatar-default.png";
  signFg: FormGroup;
  errMsg: string;
  loading: boolean = false;

  get emailFc(): FormControl {
    return <FormControl>this.signFg.get("email");
  }

  constructor(public fb: FormBuilder) {
    this.signFg = this.fb.group({
      email: fu.createFormControl(null, false, [Validators.required, Validators.email]),
      password: fu.createFormControl(null, false, [Validators.required]),
      repassword: fu.createFormControl(null, false, [Validators.required])
    })
  }

  ngOnInit() {

  }

  onSignupClick() {

  }
}
