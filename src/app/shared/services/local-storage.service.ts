import { Injectable } from '@angular/core';
import { VerifiedUser } from '../models/user.model';
import { AuthService } from './auth.service';


/**
 *
 * Local storage is used to temp store verified user object so when
 * browser is refreshed, the Authservice can instantly call .next()
 * on the logged in user.
 *
 * This prevents many nasty bugs with Guards trying to wait for Authservice's
 * currentUser$ to complete the first subscribe
 */
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private LOCAL_STORAGE_USER_KEY: string = "VERIFIED_USER";

  constructor() { }

  setCurrentUserFromLocalStorage(): VerifiedUser {
    const localStorageUser: any = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_USER_KEY));
    if (!localStorageUser || (!localStorageUser['inAppAliases'])) {
      return null;
    }
    console.info("LS User Present");
    return localStorageUser;
  }

  saveCurrentUser(u: VerifiedUser) {
    localStorage.setItem(this.LOCAL_STORAGE_USER_KEY, JSON.stringify(u));
  }

  clearCurrentUser() {
    localStorage.removeItem(this.LOCAL_STORAGE_USER_KEY);
  }

}
