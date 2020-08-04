import { createReducer, on } from '@ngrx/store';
import * as userActions from './user.actions';
import { IUserDBState } from './user.model';

/**
 * User Info Initial State
 */
const inititalState: IUserDBState = {
  loaded: false, // let this be the OVERALL loaded variable
  loading: true,
  user: null,
  error: false,
  errorMsg: null
}

export const userDBReducer = createReducer(
  inititalState,
  on(userActions.getUserDBEntryStart, (state, {uid}) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      user: null,
      error: false,
      errorMsg: null
    }
  }),
  on(userActions.getUserDBEntrySuccess, (state, {user}) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      user: user,
      error: false,
      errorMsg: null
    }
  }),
  on(userActions.getUserDBEntryFailure, (state, {errorMsg}) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      user: null,
      error: true,
      errorMsg: errorMsg
    }
  }),

  on(userActions.updateUserDBProfileEntryStart, (state, {userProfile}) => {
    return {
      ...state,

    }
  }),
  on(userActions.updateUserDBProfileSuccess, (state, {userProfile}) => {
    return {
      ...state,

    }
  }),
  on(userActions.updateUserDBProfileEntryFailure, (state, {errorMsg}) => {
    return {
      ...state,

    }
  }),
)
