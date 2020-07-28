import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Angular Material
import { MaterialModule } from './shared/material.module';
// Flex Layout
import { FlexLayoutModule } from '@angular/flex-layout';
// for MatTable, data table and service file
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FakeDataService } from './shared/fake-data.service';
// import { CustomerFakeDataService } from './customers/shared/customer-fake-data.service';
// import { ProductFakeDataService } from './products/shared/product-fake-data.service';

import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { CustomerService } from './customers/shared/customer.service';
import { ProductService } from './products/shared/product.service';
import { OrderService } from './orders/shared/order.service';

import { LocalStorageModule } from 'angular-2-local-storage';

import { CustomersModule } from './customers/customers.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

import { LoginComponent } from './login/login.component';

import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    LocalStorageModule.forRoot({
      prefix: 'my-app',
      storageType: 'localStorage'
    }),
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,

    // remove for real server
    HttpClientInMemoryWebApiModule.forRoot(
      FakeDataService, { dataEncapsulation: false }
    ),

    CustomersModule,
    ProductsModule,
    OrdersModule
  ],
  // TODO added CustomerService HttpErrorResponse, remove from other files
  providers: [
    AuthService,
    AuthGuard,
    CustomerService,
    ProductService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
