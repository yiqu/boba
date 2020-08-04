import { createAction, props } from '@ngrx/store';
import { VerifiedUser } from '../../shared/models/user.model';
import { IUserInfo, UserInfo, FireUserProfile } from './user.model';
import { LoginFailureActionProp, AuthVerifiedUserProp, FailureActionProp } from '../auth/auth.models';

const GET_USER_PROFILE_START: string = "[User/Profile] Get Profile Started";
const GET_USER_PROFILE_SUCCESS: string = "[User/Profile] Get Profile Success";
const GET_USER_PROFILE_FAILURE: string = "[User/Profile] Get Profile Failure";

const SAVE_USER_PROFILE_START: string = "[User/Profile] Save Profile Started";
const SAVE_USER_PROFILE_SUCCESS: string = "[User/Profile] Save Profile Success";
const SAVE_USER_PROFILE_FAILURE: string = "[User/Profile] Save Profile Failure";

const UPDATE_USER_DB_START: string = "[DB/User/All] Update Start";
const UPDATE_USER_DB_FAILURE: string = "[DB/User/All] Update Failure";
const UPDATE_USER_DB_SUCCESS: string = "[DB/User/All] Update Success";

const UPDATE_USER_DB_DISPLAY_START: string = "[DB/User/Profile] Update Start";
const UPDATE_USER_DB_DISPLAY_FAILURE: string = "[DB/User/Profile] Update Failure";
const UPDATE_USER_DB_DISPLAY_SUCCESS: string = "[DB/User/Profile] Update Success";

const GET_USER_DB_START: string = "[DB/User/Profile] Get Start";
const GET_USER_DB_FAILURE: string = "[DB/User/Profile] Get Failure";
const GET_USER_DB_SUCCESS: string = "[DB/User/Profile] Get Success";



/**
 * CRUD operations for Firebase internal User Info
 * https://firebase.google.com/docs/reference/js/firebase.UserInfo
 *
 * Updating user profile
 * https://firebase.google.com/docs/auth/web/manage-users#update_a_users_profile
 */

export const saveUserProfileStart = createAction(
  SAVE_USER_PROFILE_START,
  props<{info: IUserInfo}>()
)

export const saveUserProfileSuccess = createAction(
  SAVE_USER_PROFILE_SUCCESS,
  props<{info: IUserInfo, uid: string}>()
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
  props<FailureActionProp>()
)


/**
 * CRUD operations for User entry in Fire DB
 *
 * /users/{{uid}}/*
 *
 */
export const updateUserDBEntryStart = createAction(
  UPDATE_USER_DB_START,
  props<AuthVerifiedUserProp>()
)

export const updateUserDBEntryFailure = createAction(
  UPDATE_USER_DB_FAILURE,
  props<FailureActionProp>()
)

export const updateUserDBEntrySuccess = createAction(
  UPDATE_USER_DB_SUCCESS,
  props<{user: VerifiedUser}>()
)

export const getUserDBEntryStart = createAction(
  GET_USER_DB_START,
  props<{uid: string}>()
)

export const getUserDBEntryFailure = createAction(
  GET_USER_DB_FAILURE,
  props<FailureActionProp>()
)

export const getUserDBEntrySuccess = createAction(
  GET_USER_DB_SUCCESS,
  props<{user: VerifiedUser}>()
)

/**
 * DB User Profile updates
 * Display name and profile URL
 */
export const updateUserDBProfileEntryStart = createAction(
  UPDATE_USER_DB_DISPLAY_START,
  props<{userProfile: IUserInfo, uid: string}>()
)

export const updateUserDBProfileEntryFailure = createAction(
  UPDATE_USER_DB_DISPLAY_FAILURE,
  props<FailureActionProp>()
)

export const updateUserDBProfileSuccess = createAction(
  UPDATE_USER_DB_DISPLAY_SUCCESS,
  props<{userProfile: IUserInfo}>()
)

