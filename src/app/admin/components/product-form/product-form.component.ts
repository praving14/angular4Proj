import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { CategoryService } from '../../../shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import "rxjs/add/operator/take";
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component'

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  categories$;
  product = {};
  id;

  constructor(
    private categoryservice: CategoryService,
    private productservice: ProductService, 
    private router: Router,
    private route: ActivatedRoute) {
    this.categories$ = categoryservice.getCategories();
    //use the activated route to read the params
    this.id = this.route.snapshot.paramMap.get("id");
    if(this.id){ 
      //If we have an id, we should get the product information of that id
      this.productservice.getProductById(this.id).take(1).subscribe(x => this.product = x);
    }
  }

  save(product){
    if(this.id){
      //if there is an id, that means we are updating the product not creating a new product
      this.productservice.updateProduct(this.id, product);
    }else{
      this.productservice.createNewProduct(product);
    }
    this.router.navigate(['/admin/products']);
  }

}
