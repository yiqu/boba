export class BaseItem implements IBaseItem {
  constructor(public name: string, public display: string) {
  }
}

export interface IBaseItem {
  name: string;
  display: string;
}
