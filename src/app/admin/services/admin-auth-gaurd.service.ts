import { Observable } from 'rxjs/Observable';
import { UserService } from '../../shared/services/user.service';
import { AuthService } from '../../shared/services/auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminAuthGaurd implements CanActivate{

  constructor(private authservice : AuthService , private userservice: UserService) { }
  
  canActivate(): Observable<boolean>{
    return this.authservice.getAppUser$()
    .map( x => x.isAdmin);
  }

}
