import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http'; // for the service file, fakeApi

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductFakeDataService } from './shared/product-fake-data.service';

import { MaterialModule } from '../shared/material.module';

import { ProductsComponent } from './products.component';
import { ProductAddComponent } from './product-add/product-add.component';
// import { ProductDetailComponent } from './product-detail/product-detail.component';
// import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductsRoutingModule } from './products-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,

    // remove for real server
    // HttpClientInMemoryWebApiModule.forRoot(
    //   ProductFakeDataService, { dataEncapsulation: false }
    // ),

    MaterialModule,
    ProductsRoutingModule
  ],
  declarations: [
    ProductsComponent,
    ProductAddComponent,
    // ProductDetailComponent,
    // ProductEditComponent,
  ],
  exports: [
    ProductsComponent,
    ProductAddComponent,
    // ProductDetailComponent,
    // ProductEditComponent,
  ],
})
export class ProductsModule {}
