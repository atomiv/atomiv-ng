import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersComponent } from './orders.component';
import { OrderAddComponent } from './order-add/order-add.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderEditComponent } from './order-edit/order-edit.component';

const routes: Routes = [
// The last route is the wildcard route with the **-path. It will be shown if you navigate to a 
// not known URL like /test123 or for the child components /app/test123.
// child routing wit wildcards
// how to check if child route exist
{
    path: 'orders',
    children: [
      { path: '',
        component: OrdersComponent,
        pathMatch: 'full'
      },
      {
        path: 'create',
        component: OrderAddComponent,
        data: { title: 'Add Order' }
      },
      {
        path: ':id',
        component: OrderDetailComponent,
        data: { title: 'Order Details' }
      },
      {
        path: 'edit/:id',
        component: OrderEditComponent,
        data: { title: 'Edit Order' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
