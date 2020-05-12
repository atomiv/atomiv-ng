import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { CustomersComponent } from './customers/customers.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', component: CustomersComponent, canActivate: [AuthGuard] },
  { path: 'customers', component: CustomersComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/customers', pathMatch: 'full'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }


