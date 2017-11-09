import { Product } from '../../../shared/Model/product';
import { Router } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service'
import { Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {DataTableResource} from 'angular-4-data-table';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy{

  //lets save the products to the client
  products: Product[];

  items: Product[] = [];
  itemCount: number;
  tableResource : DataTableResource<Product>;
  subscription :Subscription;
  constructor( private productservice: ProductService) { 
    this.subscription = this.productservice.getAllProducts().subscribe(products => {
      this.products = products;
      this.initializeDataTable(products);
    }

    );
  }
  initializeDataTable(products){
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({offset:0})
    .then(items => this.items = items);
    this.tableResource.count()
    .then(count => this.itemCount = count); 
  }

  reloadItems(params){
    if(!this.tableResource) return;

    this.tableResource.query(params).then(items => this.items = items);
  }

  delete(productid){
    if(confirm("Are you sure you want to delete this product?")){
      this.productservice.deleteProduct(productid);
    }
  }
  
  filter(query : String){

    let filteredProducts = (query) ? this.products.filter( p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;
    this.initializeDataTable(filteredProducts);
  }

  ngOnInit(){

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
