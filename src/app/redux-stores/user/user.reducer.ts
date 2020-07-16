import { createReducer, on } from '@ngrx/store';
import * as userActions from './user.actions';
import { IUserInfoState } from './user.model';

/**
 * User Info Initial State
 */
const inititalState: IUserInfoState = {
  userInfo: null,
  profileToSave: null,
  loading: false,
  error: false,
  errMsg: null
}


export const userInfoReducer = createReducer(
  inititalState,
  on(userActions.saveUserProfileStart, (state, {info}) => {
    return {
      ...state,
      profileToSave: info,
      loading: true,
      errMsg: null,
      error: false
    }
  }),
  on(userActions.saveUserProfileSuccess, (state, {info}) => {
    return {
      ...state,
      profileToSave: info,
      loading: false,
      errMsg: null,
      error: false
    }
  }),
  on(userActions.saveUserProfileFailure, (state, {errorMsg}) => {
    return {
      ...state,
      loading: false,
      errMsg: errorMsg,
      error: true
    }
  }),
  on(userActions.getUserProfileStart, (state) => {
    return {
      ...state,
      loading: true,
      errMsg: null,
      error: false
    }
  }),
  on(userActions.getUserProfileSuccess, (state, {fireProfile}) => {
    return {
      ...state,
      userInfo: fireProfile,
      loading: false,
      errMsg: null,
      error: false
    }
  }),
  on(userActions.getUserProfileFailure, (state, {errorMsg}) => {
    return {
      ...state,
      loading: false,
      errMsg: errorMsg,
      error: true
    }
  }),
)
