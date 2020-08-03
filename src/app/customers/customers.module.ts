import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../shared/material.module';

import { CustomersComponent } from './customers.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomersRoutingModule } from './customers-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    CustomersRoutingModule
  ],
  declarations: [
    CustomersComponent,
    CustomerAddComponent,
    CustomerDetailComponent,
    CustomerEditComponent,
  ],
  exports: [
    CustomersComponent,
    CustomerAddComponent,
    CustomerDetailComponent,
    CustomerEditComponent,
  ],
  // providers: [CustomerService]
})
export class CustomersModule {}
