import { Injectable } from '@angular/core';
import { User, VerifiedUser } from '../models/user.model';
import { RestDataFireService } from './fire-data.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/database';
import { database } from 'firebase/app';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { AuthService } from './auth.service';
import { DocumentReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private BASE_USERS_URL: string = "users";
  constructor() {
  }


  public getUserDBEntryById(uid: string): DocumentReference {
    return this.getFireStore().collection(this.BASE_USERS_URL).doc(uid);
  }


  private getFireStore(): firebase.firestore.Firestore {
    return firebase.firestore();
  }

}
