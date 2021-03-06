import { Observable } from 'rxjs/Observable';
import { ShippingFormComponent } from '../shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from '../shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCart } from '../../../shared/Model/shopping-cart';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import "rxjs/add/operator/map";

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit{ 
  cart$: Observable<ShoppingCart>;
  constructor(private cartservice: ShoppingCartService,){}

  async ngOnInit(){
    this.cart$ = await this.cartservice.getCart();
  }
}
