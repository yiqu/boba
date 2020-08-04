import { Injectable } from '@angular/core';
import { AppState } from '../../redux-stores/global-store/app.reducer';
import { Store } from '@ngrx/store';
import * as fromUserActions from '../../redux-stores/user/user.actions';
import { UserInfo } from '../../redux-stores/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private store: Store<AppState>) {

  }

  updateUserProfile(profileData: UserInfo) {
    this.store.dispatch(fromUserActions.saveUserProfileStart({info: profileData}));
  }

  getUserProfile() {
    this.store.dispatch(fromUserActions.getUserProfileStart());
  }

}
