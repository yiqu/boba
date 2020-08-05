import { createReducer, on } from '@ngrx/store';
import * as userActions from './user.actions';
import { IUserDBState } from './user.model';
import * as fromAuthActions from '../auth/auth.actions';


/**
 * User Info Initial State
 */
const inititalState: IUserDBState = {
  appLoadMask: true, // let this be the OVERALL loaded variable
  crudLoaded: true,
  user: null,
  uid: null,
  error: false,
  errorMsg: null
}

export const userDBReducer = createReducer(
  inititalState,
  on(userActions.getUserDBEntryStart, (state, {uid}) => {
    return {
      ...state,
      appLoadMask: true,
      crudLoaded: false,
      user: null,
      error: false,
      errorMsg: null
    }
  }),
  on(userActions.getUserDBEntrySuccess, (state, {user}) => {
    return {
      ...state,
      appLoadMask: false,
      crudLoaded: true,
      user: user,
      error: false,
      errorMsg: null
    }
  }),
  on(userActions.getUserDBEntryFailure, (state, {errorMsg}) => {
    return {
      ...state,
      appLoadMask: false,
      crudLoaded: true,
      user: null,
      error: true,
      errorMsg: errorMsg
    }
  }),

  on(userActions.updateUserDBProfileEntryStart, (state, {userProfile}) => {
    return {
      ...state,
      crudLoaded: false,
      error: false,
      errorMsg: null
    }
  }),
  on(userActions.updateUserDBProfileSuccess, (state, {userProfile}) => {
    return {
      ...state,
      crudLoaded: true,
      error: false,
      errorMsg: null
    }
  }),
  on(userActions.updateUserDBProfileEntryFailure, (state, {errorMsg}) => {
    return {
      ...state,
      crudLoaded: true,
      error: true,
      errorMsg: errorMsg
    }
  }),

  on(fromAuthActions.updateUserLoginsTimeStart, (state, {uid}) => {
    return {
      ...state,
      crudLoaded: false,
      uid: uid
    }
  }),

  on(fromAuthActions.updateUserLoginsTimeSuccess, (state) => {
    return {
      ...state,
      crudLoaded: true,
      error: false,
      errorMsg: null
    }
  }),

  on(fromAuthActions.updateUserLoginsTimeFailure, (state, {errorMsg}) => {
    return {
      ...state,
      crudLoaded: true,
      error: true,
      errorMsg: errorMsg
    }
  }),
)
