import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as fu from '../../shared/utils/form.utils';
import { AuthInfo, IAuthInfo } from '../../shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

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

  constructor(public fb: FormBuilder, public as: AuthService, public router: Router) {
    this.signFg = this.fb.group({
      email: fu.createFormControl("t@test.com", false, [Validators.required, Validators.email]),
      password: fu.createFormControl("123456", false, [Validators.required]),
      repassword: fu.createFormControl("123456", false, [Validators.required])
    })
  }

  ngOnInit() {
    this.signFg.valueChanges.subscribe((val) => {
      this.errMsg = null;

    })
  }

  onSignupClick() {
    const res = this.signFg.value;
    if (res.password !== res.repassword) {
      this.errMsg = "Password does not match.";
    } else {
      const auth: AuthInfo = new AuthInfo(res.email, res.password);
      this.signup(auth);
    }
  }

  signup(a: AuthInfo) {
    this.errMsg = null;
    this.loading = true;
    this.as.createUser(a).then(
      (res: firebase.auth.UserCredential) => {
        this.router.navigate(['/']);
      },
      (rej) => {
        this.errMsg = this.as.getFirebaseErrorMsg(rej);
      }
    ).finally(
      () => {
        this.loading = false;
      }
    )
  }
}
