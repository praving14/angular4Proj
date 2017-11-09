import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderService {

  constructor( private db : AngularFireDatabase, private cartservice: ShoppingCartService) { }
 
  async placeOrder(order){
    let result =  this.db.list("/orders").push(order);
    this.cartservice.clearCart(); // There is  a possibility that the second line fails for some unexpected reason while connecting with firebase. A more reliable
    // approach is to have transaction.
    return result;
  }


}
