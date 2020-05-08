import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as fu from '../../shared/utils/form.utils';
import { AuthInfo, IAuthInfo } from '../../shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-auth-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class AuthSignupComponent implements OnInit {

  signInTitle: string = "Create your BobaShop Account.";
  avartarImgSrc: string = "assets/images/main/user/signin-avatar-default.png";
  signFg: FormGroup;

  get emailFc(): FormControl {
    return <FormControl>this.signFg.get("email");
  }

  constructor(public fb: FormBuilder, public as: AuthService, public router: Router) {
    let id: string = null;
    let pw: string = null;
    if (!environment.production) {
      id = "t@test.com";
      pw = "123456";
    }

    this.signFg = this.fb.group({
      email: fu.createFormControl(id, false, [Validators.required, Validators.email]),
      password: fu.createFormControl(pw, false, [Validators.required]),
      repassword: fu.createFormControl(pw, false, [Validators.required])
    });
  }

  ngOnInit() {
    this.signFg.valueChanges.subscribe((val) => {
      this.as.authErrMsg = null;
    });
  }

  onSignupClick() {
    const res = this.signFg.value;
    if (res.password !== res.repassword) {
      this.as.authErrMsg = "Password does not match.";
    } else {
      const auth: AuthInfo = new AuthInfo(res.email, res.password, false);
      this.signup(auth);
    }
  }

  signup(a: AuthInfo) {
    this.as.createUser(a);
  }
}
