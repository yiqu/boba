import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as fu from '../../shared/utils/form.utils';
import { AuthInfo, IAuthInfo } from '../../shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-auth-signin',
  templateUrl: 'signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class AuthSigninComponent implements OnInit {

  signInTitle: string = "Sign in with your BobaShop Account";
  avartarImgSrc: string = "assets/images/main/user/signin-avatar-default.png";
  signFg: FormGroup;


  get idFc(): FormControl {
    return <FormControl>this.signFg.get("id");
  }

  get passwordFc(): FormControl {
    return <FormControl>this.signFg.get("password");
  }

  constructor(public fb: FormBuilder, public as: AuthService, public router: Router) {
    let id: string = null;
    let pw: string = null;
    if (!environment.production) {
      id = "t@test.com";
      pw = "123456";
    }
    this.signFg = this.fb.group({
      id: fu.createFormControl(id, false, [Validators.required, Validators.email]),
      password: fu.createFormControl(pw, false),
      saveSession: fu.createFormControl(true, false)
    });
  }

  ngOnInit() {
    this.signFg.valueChanges.subscribe((val) => {
      this.as.authErrMsg = null;
    });
  }

  onSignInClick() {
    if (this.passwordFc.value && this.passwordFc.value.trim()!=="") {
      console.log(this.signFg.value)
      const auth: AuthInfo = new AuthInfo(this.signFg.value.id, this.signFg.value.password,
        this.signFg.value.saveSession);
      this.signIn(auth);
    } else {
      this.as.authErrMsg = "Enter a password.";
    }
  }

  signIn(a: AuthInfo) {
    this.as.loginUser(a);
  }


}
