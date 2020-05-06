import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as fu from '../../shared/utils/form.utils';
import { AuthInfo, IAuthInfo } from '../../shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-signin',
  templateUrl: 'signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class AuthSigninComponent implements OnInit {

  signInTitle: string = "Sign in with your BobaShop Account";
  avartarImgSrc: string = "assets/images/main/user/signin-avatar-default.png";
  signFg: FormGroup;
  errMsg: string;
  loading: boolean = false;


  get idFc(): FormControl {
    return <FormControl>this.signFg.get("id");
  }

  get passwordFc(): FormControl {
    return <FormControl>this.signFg.get("password");
  }

  constructor(public fb: FormBuilder, public as: AuthService, public router: Router) {
    this.signFg = this.fb.group({
      id: fu.createFormControl("t1@test.com", false, [Validators.required, Validators.email]),
      password: fu.createFormControl("123456", false),
    });
  }

  ngOnInit() {
    this.signFg.valueChanges.subscribe((val) => {
      this.errMsg = null;
    });
  }

  onSignInClick() {
    if (this.passwordFc.value && this.passwordFc.value.trim()!=="") {
      const auth: AuthInfo = new AuthInfo(this.signFg.value.id, this.signFg.value.password);
      this.signIn(auth);
    } else {
      this.errMsg = "Enter a password.";
    }
  }

  signIn(a: AuthInfo) {
    this.errMsg = null;
    this.loading = true;
    this.as.loginUser(a).then(
      (res) => {
        this.router.navigate(['/']);
      },
      (rej) => {
        this.errMsg = this.as.getFirebaseErrorMsg(rej);
      }
    ).finally(() => {
      this.loading = false;
    })
  }


}
