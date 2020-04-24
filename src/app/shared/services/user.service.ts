import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { RestDataFireService } from './fire-data.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: User;
  allUsersr$: Observable<User[]> = new BehaviorSubject<User[]>([]);
  usersListFDB: AngularFireList<User>;

  // Users related URLs
  private BASE_USERS_URL: string = "users";

  constructor(public rfd: RestDataFireService, public firedb: AngularFireDatabase) {
    this.usersListFDB = this.firedb.list(this.BASE_USERS_URL);

    this.allUsersr$ = this.usersListFDB.snapshotChanges().pipe(
      map((changes) => this.addfireKey(changes)),
    );

  }

  getSingleUser(userId) {

  }

  addfireKey(c: SnapshotAction<any>[]) {
    return c.map((c: SnapshotAction<any>) => {
      return (
        { fireKey: c.payload.key,
          ...c.payload.val()
        }
      )}
    );
  }

}
