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
