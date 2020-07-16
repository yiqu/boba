import { VerifiedUser, AuthInfo } from '../../shared/models/user.model';


export interface AuthState {
  verifiedUser: VerifiedUser;
  loading: boolean;
  error: boolean;
  errorMsg: string;
  resetEmail: string;
}

export class LoginStartActionProp {
  constructor(public authInfo: AuthInfo) {
  }
}

export class LoginSuccessActionProp {
  constructor(public verifiedUser: any, public redirect?: boolean, public showAlert?: boolean) {
  }
}

export class LoginFailureActionProp {
  constructor(public errorMsg: any) {
  }
}


export class UserRegistrationFromEmailActionProp {
  constructor(public userEmail: string, public password: string, public saveSession: boolean) {
  }
}

export class AuthVerifiedUserProp {
  constructor(public user: VerifiedUser) {
  }
}

export class LogoutIfRedirectActionProp {
  constructor(public redirect: boolean, public showAlert?: boolean) {
  }
}

export class UserCredentialResetActionProp {
  constructor(public email: string) {

  }
}
