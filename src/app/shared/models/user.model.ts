export class User {
  constructor(public id: string, public display: string) {
    this.id = id ? id : "UnknownID";
    this.display = display ? display : "Unknown User";
  }
}
