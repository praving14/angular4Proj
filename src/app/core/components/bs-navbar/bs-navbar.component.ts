import { ShoppingCart } from '../../../shared/Model/shopping-cart';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { AppUser } from '../../../shared/Model/app-user';
import { AuthService } from '../../../shared/services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
 appUser : AppUser;
 cart$: Observable<ShoppingCart>;

  constructor( private authservice: AuthService, private cartservice: ShoppingCartService) { 
    authservice.getAppUser$().subscribe(x => this.appUser = x);

  }

 async ngOnInit(){
    this.cart$ = await this.cartservice.getCart();  
  }

  logOut(){
    this.authservice.logOut();
  }

}
