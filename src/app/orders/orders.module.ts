import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../shared/material.module';

import { OrdersComponent } from './orders.component';
import { OrderAddComponent } from './order-add/order-add.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { OrdersRoutingModule } from './orders-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    OrdersRoutingModule
  ],
  declarations: [
    OrdersComponent,
    OrderAddComponent,
    OrderDetailComponent,
    OrderEditComponent,
  ],
  exports: [
    OrdersComponent,
    OrderAddComponent,
    OrderDetailComponent,
    OrderEditComponent,
  ],
})
export class OrdersModule {}
