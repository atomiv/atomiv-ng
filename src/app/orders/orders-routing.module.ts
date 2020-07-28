import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersComponent } from './orders.component'; // or OrderListComponent
import { OrderAddComponent } from './order-add/order-add.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderEditComponent } from './order-edit/order-edit.component';

const routes: Routes = [

  {
    path: 'orders',
    // component: OrdersComponent,
    // data: { title: 'List of Orders'},
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
      },
      {
        path: '**',
        redirectTo: '/orders'
      },
    ]
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
