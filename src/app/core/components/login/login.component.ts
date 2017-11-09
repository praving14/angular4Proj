import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor( public authservice : AuthService) {
  }

  logIn(){
    this.authservice.logIn();
  }

}
