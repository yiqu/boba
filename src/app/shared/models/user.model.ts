export class User {
  constructor(public id?: string, public display?: string) {

    this.id = id ? id : "UnknownID";
    this.display = display ? display : "Unknown User";
  }
}


export interface IAuthInfo {
  id: string;
  password: string;
}

export class AuthInfo implements IAuthInfo{
  constructor(public id: string, public password: string){
  }
}

export class VerifiedUser {
  constructor(
    public createdAt: string,
    public displayName: string,
    public email: string,
    public emailVerified: string,
    public isAnonymous: string,
    public lastLoginAt: string,
    public photoURL: string,
    public providerData: ProviderData[],
    public stsTokenManager: any,
    public tenantId: string,
    public uid: string,
    public phoneNumber: string
  ) {

  }
}

export class ProviderData {
  constructor(
    public displayName: string,
    public email: string,
    public phoneNumber: string,
    public photoURL: string,
    public providerId: string,
    public uid: string,
  ) {

  }
}
