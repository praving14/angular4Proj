import { Component, Input } from '@angular/core';
import { ShoppingCart } from '../../Model/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../Model/product'

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

  
  @Input('product') product:Product;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor( private cartservice: ShoppingCartService) { }


addToCart(){
  this.cartservice.addToCart(this.product);
}
removeFromCart(){
  this.cartservice.removeFromCart(this.product);
}

}
