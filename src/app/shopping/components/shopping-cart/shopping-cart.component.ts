import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart$;
  constructor( private cartservice: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.cartservice.getCart();
  }

  clearTrolley(){
    this.cartservice.clearCart();
  }
}
