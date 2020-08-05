import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuppliersComponent } from './suppliers.component';
import { SupplierAddComponent } from './supplier-add/supplier-add.component';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';
import { SupplierEditComponent } from './supplier-edit/supplier-edit.component';

const routes: Routes = [

  {
    path: 'suppliers',
    children: [
      { path: '',
        component: SuppliersComponent,
        pathMatch: 'full'
      },
      {
        path: 'create',
        component: SupplierAddComponent,
        data: { title: 'Add Supplier' }
      },
      {
        path: ':id',
        component: SupplierDetailComponent,
        data: { title: 'Supplier Details' }
      },
      {
        path: 'edit/:id',
        component: SupplierEditComponent,
        data: { title: 'Edit Supplier' }
      },
      {
        path: '**',
        redirectTo: '/suppliers'
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule { }
