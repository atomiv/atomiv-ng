import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http'; // for the service file, fakeApi

// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { CustomerFakeDataService } from './shared/customer-fake-data.service';

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
    HttpClientModule,

    // // remove for real server
    // HttpClientInMemoryWebApiModule.forRoot(
    //   CustomerFakeDataService, { dataEncapsulation: false }
    // ),

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
    // sharing component between two different modules
    CustomersComponent,
    CustomerAddComponent,
    CustomerDetailComponent,
    CustomerEditComponent,
  ],
  // to make service available to all components, add to 'providers' array
  // providers: [CustomerService]
})
export class CustomersModule {}
