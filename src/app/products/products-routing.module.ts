import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products.component'; // or ProductListComponent
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

const routes: Routes = [

  {
    path: 'products',
    // component: ProductsComponent,
    // data: { title: 'List of Products'},
    children: [
      { path: '',
        component: ProductsComponent,
        pathMatch: 'full'
      },
      {
        path: 'create',
        component: ProductAddComponent,
        data: { title: 'Add Product' }
      },
      {
        path: ':id',
        component: ProductDetailComponent,
        data: { title: 'Product Details' }
      },
      {
        path: 'edit/:id',
        component: ProductEditComponent,
        data: { title: 'Edit Product' }
      },
      {
        path: '**',
        redirectTo: '/products'
      },
    ]
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
