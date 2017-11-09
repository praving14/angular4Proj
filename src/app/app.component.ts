import { UserService } from './shared/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { AuthGuard } from './shared/services/auth-guard.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userservice:UserService, private authservice : AuthService, private router : Router){
    authservice.user$.subscribe(user=> { 
      if(!user) return;
        userservice.saveUser(user);
        let returnUrl = localStorage.getItem('returnUrl');
        if(!returnUrl) return;
          localStorage.removeItem('returnUrl');
          router.navigateByUrl(returnUrl);
    })
  }

}
