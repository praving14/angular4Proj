import { ShoppingCart } from '../../../shared/Model/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Product } from '../../../shared/Model/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import "rxjs/add/operator/switchMap"
import {ProductFilterComponent} from "./product-filter/product-filter.component";
import {ProductCardComponent} from '../../../shared/components/product-card/product-card.component'

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  products : Product[] = [];
  filteredProducts: Product[] = [];
  category :String;
  cart$: Observable<ShoppingCart>;

  constructor( private productservice: ProductService , 
    private route : ActivatedRoute,
  private cartservice : ShoppingCartService)
  { }

  async ngOnInit(){
    this.cart$ = await this.cartservice.getCart();
    this.populateProducts();
    
  }

  private applyFilter(){
    this.filteredProducts = (this.category) ?
    this.products.filter(x => x.category == this.category) :
    this.products;
  }

  private populateProducts(){
// instead of nested observables it is better have switchmap operator to move from one observable to another
    this.productservice.getAllProducts().switchMap(products => {
      this.products = products;
      return this.route.queryParamMap;
    }).subscribe( params => {
      this.category = params.get('category');
      this.applyFilter();
    })
  }

}
