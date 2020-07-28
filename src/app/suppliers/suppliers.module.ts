import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http'; // for the service file, fakeApi

import { MaterialModule } from '../shared/material.module';

import { SuppliersComponent } from './suppliers.component';
import { SupplierAddComponent } from './supplier-add/supplier-add.component';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';
import { SupplierEditComponent } from './supplier-edit/supplier-edit.component';
import { SuppliersRoutingModule } from './suppliers-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    MaterialModule,
    SuppliersRoutingModule
  ],
  declarations: [
    SuppliersComponent,
    SupplierAddComponent,
    SupplierDetailComponent,
    SupplierEditComponent,
  ],
  exports: [
    SuppliersComponent,
    SupplierAddComponent,
    SupplierDetailComponent,
    SupplierEditComponent,
  ],
})
export class SuppliersModule {}
