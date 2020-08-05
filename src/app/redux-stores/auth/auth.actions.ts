import { createAction, props } from '@ngrx/store';
import { Action } from '@ngrx/store';
import { LoginSuccessActionProp, LoginFailureActionProp, LoginStartActionProp,
  UserRegistrationFromEmailActionProp, AuthVerifiedUserProp, LogoutIfRedirectActionProp, UserCredentialResetActionProp, FailureActionProp}
from './auth.models';

const LOGIN_START: string = "[Auth/Login] Auth Login Start";
const LOGIN_SUCCESS: string = "[Auth/Login] Auth Login Success";
const LOGIN_FAILURE: string = "[Auth/Login] Auth Login Failure";

const LOGIN_TIME_SAVE_START: string = "[DB/User/Profile] Update User Login Times Start";
const LOGIN_TIME_SAVE_SUCCESS: string = "[DB/User/Profile] Update User Login Times Success";
const LOGIN_TIME_SAVE_FAILURE: string = "[DB/User/Profile] Update User Login Times Failure";

const LOGIN_FIREBASE_REQUEST_SENT: string = "[Auth/Login] Auth Login Firebase Request Sent Success";

const LOGOUT_START: string = "[Auth/Logout] Auth Logout Start";
const LOGOUT_SUCCESS: string = "[Auth/Logout] Auth Logout Success";

const NEW_USER_REGISTRATION_START: string = "[Auth/Register] Auth New User Register Start";
const NEW_USER_REGISTRATION_SUCCESS: string = "[Auth/Register] Auth New User Register Success";
const NEW_USER_REGISTRATION_FAILURE: string = "[Auth/Register] Auth New User Register Failure";

const NEW_USER_REGISTRATION_ADD_TO_DB: string = "[Auth/Register] Auth New User Add To DB";
const NEW_USER_REGISTRATION_ADD_TO_DB_SUCCESS: string = "[Auth/Register] Auth New User Add To DB Success";
const NEW_USER_REGISTRATION_ADD_TO_DB_FAILURE: string = "[Auth/Register] Auth New User Add To DB Failure";

const USER_ACTION_CLEAR_ERRORS: string = "[Auth/User] User Action Clear Errors";
const USER_ACTION_THROW_ERROR: string = "[Auth/User] User Action Throw Error";

const AUTO_LOGIN: string = "[Auth/Auto] Auto Log In";

const RESET_PASSWORD_START: string = "[Auth/Reset] Reset Password Start";
const RESET_PASSWORD_SUCCESS: string = "[Auth/Reset] Reset Password Success";
const RESET_PASSWORD_ERROR: string = "[Auth/Reset] Reset Password Failure";

export const authLoginStart = createAction(
  LOGIN_START,
  props<LoginStartActionProp>()
);

export const authLoginSuccess = createAction(
  LOGIN_SUCCESS,
  props<LoginSuccessActionProp>()
);

export const authLoginFailure = createAction(
  LOGIN_FAILURE,
  props<LoginFailureActionProp>()
);

export const authLoginFirebaseRequestSuccess = createAction(
  LOGIN_FIREBASE_REQUEST_SENT,
  props<{userId: string}>()
);

export const authLogoutSuccess = createAction(
  LOGOUT_SUCCESS,
  props<LogoutIfRedirectActionProp>()
);

export const authLogoutStart = createAction(
  LOGOUT_START
);

export const authUserRegistrationFromEmailStart = createAction(
  NEW_USER_REGISTRATION_START,
  props<UserRegistrationFromEmailActionProp>()
);

export const authUserRegistrationFromEmailSuccess = createAction(
  NEW_USER_REGISTRATION_SUCCESS
);

export const authUserRegistrationFromEmailFailure = createAction(
  NEW_USER_REGISTRATION_FAILURE,
  props<LoginFailureActionProp>()
);

export const authAddNewRegisteredUserToDatabase = createAction(
  NEW_USER_REGISTRATION_ADD_TO_DB,
  props<AuthVerifiedUserProp>()
);

export const authAddNewRegisteredUserToDbSuccess = createAction(
  NEW_USER_REGISTRATION_ADD_TO_DB_SUCCESS
);

export const authAddNewRegisteredUserToDbFail = createAction(
  NEW_USER_REGISTRATION_ADD_TO_DB_FAILURE
);

export const authClearErrorsByUser = createAction(
  USER_ACTION_CLEAR_ERRORS
)

export const authThrowErrorMessageByUser = createAction(
  USER_ACTION_THROW_ERROR,
  props<LoginFailureActionProp>()
)

export const authAutoLogin = createAction(
  AUTO_LOGIN,
  props<AuthVerifiedUserProp>()
)

export const authResetPasswordStart = createAction(
  RESET_PASSWORD_START,
  props<UserCredentialResetActionProp>()
)

export const authResetPasswordFail = createAction(
  RESET_PASSWORD_ERROR,
  props<LoginFailureActionProp>()
)

export const authResetPasswordSuccess = createAction(
  RESET_PASSWORD_SUCCESS,
  props<UserCredentialResetActionProp>()
)

export const updateUserLoginsTimeStart = createAction(
  LOGIN_TIME_SAVE_START,
  props<{uid: string, time: number}>()
)

export const updateUserLoginsTimeSuccess = createAction(
  LOGIN_TIME_SAVE_SUCCESS
)

export const updateUserLoginsTimeFailure = createAction(
  LOGIN_TIME_SAVE_FAILURE,
  props<FailureActionProp>()
)
