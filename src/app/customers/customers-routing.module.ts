import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomersComponent } from './customers.component'; // or CustomerListComponent
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';

const routes: Routes = [

  {
    path: 'customers',
    // component: CustomersComponent,
    // data: { title: 'List of Customers'},
    children: [
      { path: '',
        component: CustomersComponent,
        pathMatch: 'full'
      },
      {
        path: 'create',
        component: CustomerAddComponent,
        data: { title: 'Add Customer' }
      },
      {
        path: ':id',
        component: CustomerDetailComponent,
        data: { title: 'Customer Details' }
      },
      {
        path: 'edit/:id',
        component: CustomerEditComponent,
        data: { title: 'Edit Customer' }
      },
      {
        path: '**',
        redirectTo: '/customers'
      },
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
