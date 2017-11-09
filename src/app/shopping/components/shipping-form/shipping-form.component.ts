import { ShoppingCart } from '../../../shared/Model/shopping-cart';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Order } from '../../../shared/Model/order';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { OrderService } from '../../../shared/services/order.service';
import { AuthService } from '../../../shared/services/auth.service';


@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart
  shipping = {}; 
  userSubscription :Subscription;
  userId: string;
  constructor(private router: Router,  private orderservice: OrderService, private authservice: AuthService,) { }

  ngOnInit(){
    this.userSubscription = this.authservice.user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart );
    let result = await this.orderservice.placeOrder(order);
    this.router.navigate(["./order-success", result.key]);
  
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

}
