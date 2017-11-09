import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {CanActivate, RouterStateSnapshot} from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authservice: AuthService, private router : Router) { }

  canActivate( route, state : RouterStateSnapshot){
    return this.authservice.user$.map(user => {
      if(user){ return true;}

       // If user is not authenticated navigate the to the log in page for user authentication
      this.router.navigate(['/login'], {queryParams : {returnUrl : state.url }});
      return false;
    })
  }
}
