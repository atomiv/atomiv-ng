import { InMemoryDbService } from 'angular-in-memory-web-api';
import { ICustomer } from '../customers/shared/customer';
import { IProduct } from '../products/shared/product';
import { IOrder } from '../orders/shared/order';
import { ISupplier } from '../suppliers/shared/supplier';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FakeDataService implements InMemoryDbService {

  createDb() {
    const customers = [
      { id: 1,
      firstName: 'Paul',
      lastName: 'Michels',
      email: 'paul.michels@gmail.com' },

      { id: 2, firstName: 'John', lastName: 'Adams', email: 'j.adams@gmail.com' },
      { id: 3, firstName: 'Helen', lastName: 'David', email: 'h.david@gmail.com' },
      { id: 4, firstName: 'Kate', lastName: 'Johnson', email: 'kate@gmail.com' },
      { id: 5, firstName: 'Mark', lastName: 'Daniels', email: 'mark@hotmail.com' },
      { id: 6, firstName: 'Alison', lastName: 'Twain', email: 'alison@yahoo.com' },
      { id: 7, firstName: 'Mary', lastName: 'Daniels', email: 'mary@gmail.com' },
      { id: 8, firstName: 'John', lastName: 'Daniels', email: 'j.damniels@gmail.com' },
      { id: 9, firstName: 'David', lastName: 'Adams', email: 'david.adams@gmail.com' },
      { id: 10, firstName: 'Daniel', lastName: 'Smith', email: 'daniel.smith@gmail.com' },
      { id: 11, firstName: 'Jil', lastName: 'Smith', email: 'jil.smith@gmail.com' },
      { id: 12, firstName: 'Susan', lastName: 'Damon', email: 'susan@yahoo.com' },
      { id: 13, firstName: 'Amy', lastName: 'Johnson', email: 'amy.johnson@gmail.com' },
      { id: 14, firstName: 'Ana', lastName: 'Daniels', email: 'ana.daniels@hotmail.com' },
      { id: 15, firstName: 'James', lastName: 'Wilson', email: 'james.wilson@yahoo.com' },
    ];

    // €
    const products = [
      { id: 1, code: 'C145', productName: 'Televsion set', description: 'High quality product', price: 1000, isListed: 'YES' },
      { id: 2, code: 'C882', productName: 'Mobile Phone', description: 'Black case cover', price: 200, isListed: 'YES' },
      { id: 3, code: 'T125', productName: 'Keyboard', description: 'Suiatble for use in EU', price: 100, isListed: 'YES' },
      { id: 4, code: 'T445', productName: 'Speakers', description: 'Available in red and black', price: 150, isListed: 'NO' },
      { id: 5, code: 'T543', productName: 'Laptop', description: 'High screen resolution', price: 800, isListed: 'YES' },
      { id: 6, code: 'T857', productName: 'Mobile Screen', description: 'Good quality', price: 100, isListed: 'YES' },
    ];

    const orders = [

      {
        id: 4,
        customerId: 1,
        orderItems: [
          // productName, price
          { id: 1, productId: 5, quantity: 1400 },
          { id: 2, productId: 3, quantity: 1300 },
          { id: 4, productId: 2, quantity: 1000000 }
        ]
      },
      {
        id: 5,
        customerId: 1,
        orderItems: [
          // productName, price
          { id: 1, productId: 5, quantity: 200 },
          { id: 2, productId: 3, quantity: 100 },
        ]
      },
      {
        id: 1,
        customerId: 3,
        orderItems: [
          { id: 1, productId: 1, quantity: 4 },
          { id: 2, productId: 3, quantity: 2 },
        ]
      },
      {
        id: 2,
        customerId: 2,
        orderItems: [
          { id: 1, productId: 5, quantity: 12 },
          { id: 2, productId: 6, quantity: 10 },
        ]
      }
    ];

    /*
    id
customer
date
status

draft.. click 'Submit' button -> 'Submitted
next status: 'Ship' and 'Cancel'

----------
oorder itesm...

product
product code
price
qty
total (price x qty)
    */
    const suppliers = [
      { id: 1, name: 'MaxPro', city: 'Belgrade', notes: '' },
      { id: 2, name: 'Alptium', city: 'London', notes: '' },
      { id: 3, name: 'ForceZero', city: 'Munchen', notes: '' },
      { id: 4, name: 'Aquatics', city: 'Berlin', notes: '' },
      { id: 5, name: 'GeoMat', city: 'Madrid', notes: '' },
      { id: 6, name: 'Forte', city: 'Belgrade', notes: '' },
    ];

    return { customers, products, orders, suppliers };
  }

  genId(customers: ICustomer[]): number {
    return customers.length > 0 ? Math.max(...customers.map(customer => customer.id)) + 1 : 11;
  }

  // genId(products: IProduct[]): number {
  //   return products.length > 0 ? Math.max(...products.map(product => product.id)) + 1 : 11;
  // }

  // genId(orders: IOrder[]): number {
  //   return orders.length > 0 ? Math.max(...orders.map(order => order.id)) + 1 : 11;
  // }

}
