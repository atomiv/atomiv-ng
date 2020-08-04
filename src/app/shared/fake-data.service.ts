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

    const products = [
      { id: 1, firstName: 'mango', notes: '' },
      { id: 2, firstName: 'Apple', notes: '01' },
      { id: 3, firstName: 'Banana', notes: '02' },
      { id: 4, firstName: 'Pear', notes: '03' },
      { id: 5, firstName: 'Pineapple', notes: '04' },
      { id: 6, firstName: 'Alison', notes: '05' },
      { id: 7, firstName: 'Name7', notes: '' },
      { id: 8, firstName: 'Name8', notes: '' },
      { id: 9, firstName: 'Name9', notes: '' },
      { id: 10, firstName: 'Name10', notes: '' },
      { id: 11, firstName: 'Name11', notes: '' },
      { id: 12, firstName: 'Name12', notes: '' },
      { id: 13, firstName: 'Name13', notes: '' },
      { id: 14, firstName: 'Name14', notes: '' },
      { id: 15, firstName: 'Name15', notes: '' },
      { id: 16, firstName: 'Name16', notes: '' },
      { id: 17, firstName: 'Name17', notes: '' },
      { id: 18, firstName: 'Name18', notes: '' },
      { id: 19, firstName: 'Name19', notes: '' },
      { id: 20, firstName: 'Name20', notes: '' },
    ];

    const orders = [
      { id: 1, firstName: 'order1', notes: '' },
      { id: 2, firstName: 'order2', notes: '01' },
      { id: 3, firstName: 'order3', notes: '02' },
      { id: 4, firstName: 'order4', notes: '03' },
      { id: 5, firstName: 'order5', notes: '04' },
      { id: 6, firstName: 'order6', notes: '05' },
      { id: 7, firstName: 'Name7', notes: '' },
      { id: 8, firstName: 'Name8', notes: '' },
      { id: 9, firstName: 'Name9', notes: '' },
      { id: 10, firstName: 'Name10', notes: '' },
      { id: 11, firstName: 'Name11', notes: '' },
      { id: 12, firstName: 'Name12', notes: '' },
      { id: 13, firstName: 'Name13', notes: '' },
      { id: 14, firstName: 'Name14', notes: '' },
      { id: 15, firstName: 'Name15', notes: '' },
      { id: 16, firstName: 'Name16', notes: '' },
      { id: 17, firstName: 'Name17', notes: '' },
      { id: 18, firstName: 'Name18', notes: '' },
      { id: 19, firstName: 'Name19', notes: '' },
      { id: 20, firstName: 'Name20', notes: '' },
    ];

    const suppliers = [
      { id: 1, firstName: 's1', notes: '' },
      { id: 2, firstName: 's2', notes: '01' },
      { id: 3, firstName: 's3', notes: '02' },
      { id: 4, firstName: 's4', notes: '03' },
      { id: 5, firstName: 's5', notes: '04' },
      { id: 6, firstName: 's6', notes: '05' },
      { id: 7, firstName: 'Name7', notes: '' },
      { id: 8, firstName: 'Name8', notes: '' },
      { id: 9, firstName: 'Name9', notes: '' },
      { id: 10, firstName: 'Name10', notes: '' },
      { id: 11, firstName: 'Name11', notes: '' },
      { id: 12, firstName: 'Name12', notes: '' },
      { id: 13, firstName: 'Name13', notes: '' },
      { id: 14, firstName: 'Name14', notes: '' },
      { id: 15, firstName: 'Name15', notes: '' },
      { id: 16, firstName: 'Name16', notes: '' },
      { id: 17, firstName: 'Name17', notes: '' },
      { id: 18, firstName: 'Name18', notes: '' },
      { id: 19, firstName: 'Name19', notes: '' },
      { id: 20, firstName: 'Name20', notes: '' },
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
