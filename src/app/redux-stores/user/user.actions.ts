import { createAction, props } from '@ngrx/store';
import { VerifiedUser } from '../../shared/models/user.model';
import { IUserInfo, UserInfo, FireUserProfile } from './user.model';
import { LoginFailureActionProp } from '../auth/auth.models';

const GET_USER_PROFILE_START: string = "[User/Profile] Get User Profile Started";
const GET_USER_PROFILE_SUCCESS: string = "[User/Profile] Get User Profile Success";
const GET_USER_PROFILE_FAILURE: string = "[User/Profile] Get User Profile Failure";
const SAVE_USER_PROFILE_START: string = "[User/Profile] Save User Profile Started";
const SAVE_USER_PROFILE_SUCCESS: string = "[User/Profile] Save User Profile Success";
const SAVE_USER_PROFILE_FAILURE: string = "[User/Profile] Save User Profile Failure";

export const saveUserProfileStart = createAction(
  SAVE_USER_PROFILE_START,
  props<{info: IUserInfo}>()
)

export const saveUserProfileSuccess = createAction(
  SAVE_USER_PROFILE_SUCCESS,
  props<{info: IUserInfo}>()
)

export const saveUserProfileFailure = createAction(
  SAVE_USER_PROFILE_FAILURE,
  props<LoginFailureActionProp>()
)

export const getUserProfileStart = createAction(
  GET_USER_PROFILE_START
)

export const getUserProfileSuccess = createAction(
  GET_USER_PROFILE_SUCCESS,
  props<{fireProfile: VerifiedUser}>()
)

export const getUserProfileFailure = createAction(
  GET_USER_PROFILE_FAILURE,
  props<LoginFailureActionProp>()
)
