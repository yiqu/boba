import { VerifiedUser } from './user.model';
import { DrinkOrder } from './tea.models';

export interface IStore {
  storeId: string;
  storeName: string;
  owner: VerifiedUser;
  address: string;
  phone: string | number;
  users: VerifiedUser[];
  orders: DrinkOrder[];
}

export class BobaStore implements IStore {
  constructor(public storeId: string, public storeName: string, public owner: VerifiedUser, public address: string,
    public phone: string | number, public users: VerifiedUser[], public orders: DrinkOrder[]) {
  }
}
