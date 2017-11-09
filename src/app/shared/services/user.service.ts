import { AppUser } from '../Model/app-user';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class UserService {

  constructor(private db : AngularFireDatabase) { }

  saveUser(user: firebase.User){
    this.db.object('/users/'+ user.uid).update({
      name: user.displayName,
      email: user.email
    });

  }
  getUser(uid: String):FirebaseObjectObservable<AppUser>  {
    return this.db.object('/users/' + uid);
  }

}
