import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

  constructor( private db: AngularFireDatabase) {

   }

   createNewProduct(product){
  
     return this.db.list('/products').push(product);
     
   }

   getAllProducts(){
     return this.db.list('/products');
   }

   getProductById(productId){
      return this.db.object('/products/'+ productId);
   }

   updateProduct(productId, product){
     return this.db.object('/products/' + productId).update(product);
   }

   deleteProduct(productId){
      this.db.object('/products/'+productId).remove();
   }

}
