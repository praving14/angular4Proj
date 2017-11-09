import { UserService } from './user.service';
import { AppUser } from '../Model/app-user';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService {

  user$ : Observable<firebase.User>;
  constructor( private afAuth : AngularFireAuth,
     private route : ActivatedRoute,
      private userservice : UserService, private router : Router) 
      {
      this.user$ = afAuth.authState;
   }

  logIn(){
    //save the returnUrl in local storage
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl',returnUrl );
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());

  }

  logOut(){
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }
 
  getAppUser$(): Observable<AppUser>{
    return this.user$
    .switchMap(user => {
      if(user) { return this.userservice.getUser(user.uid)}
      else return Observable.of(null);  });
  }

}
