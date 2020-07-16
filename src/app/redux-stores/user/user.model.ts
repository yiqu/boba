import { VerifiedUser } from 'src/app/shared/models/user.model';

export interface IUserInfo {
  displayName: string;
  photoURL: string;
}

export class UserInfo implements IUserInfo {
  constructor(public displayName: string, public photoURL: string) {}
}

/**
 * User profile from Firebase auth.
 * To get a user's profile information, use the properties of an instance of User.
 */
export class FireUserProfile {
  constructor(public displayName: string, public photoURL: string, public email?: string,  public emailVerfied?: boolean,
    public uid?: string) {
    }
}

export interface IUserInfoState {
  userInfo: VerifiedUser;
  profileToSave: UserInfo;
  loading: boolean;
  error: boolean;
  errMsg: string;
}
