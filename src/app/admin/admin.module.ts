import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from './../shared/services/auth-guard.service';
import { SharedModule } from './../shared/shared.module';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGaurd } from './services/admin-auth-gaurd.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
         path: "admin/products/new",
         component: ProductFormComponent,
         canActivate:[AuthGuard, AdminAuthGaurd]
      },{
        path: "admin/products/:id",
        component: ProductFormComponent,
        canActivate:[AuthGuard, AdminAuthGaurd]
     },{
      path: "admin/products",
      component: AdminProductsComponent,
      canActivate : [AuthGuard, AdminAuthGaurd]
    },{
        path: "admin/orders",
        component: AdminOrdersComponent,
        canActivate : [AuthGuard, AdminAuthGaurd]
      }
    ])
  ],
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,]
})
export class AdminModule { }
