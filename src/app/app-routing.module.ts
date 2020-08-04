import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { CustomersComponent } from './customers/customers.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { SuppliersComponent } from './suppliers/suppliers.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // TODO
  // { path: 'customers', component: CustomersComponent, canActivate: [AuthGuard] },
  { path: 'customers', component: CustomersComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'suppliers', component: SuppliersComponent },
  { path: '', redirectTo: 'customers', pathMatch: 'full' },
  { path: '**', redirectTo: '/customers' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
