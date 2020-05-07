import { InMemoryDbService } from 'angular-in-memory-web-api';
import { ICustomer } from './customer';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerFakeDataService implements InMemoryDbService {

  createDb() {
    const customers = [
      { id: 1,
      firstName: 'Paul',
      notes: '' },

      { id: 2, firstName: 'John', notes: '01' },
      { id: 3, firstName: 'Helen', notes: '02' },
      { id: 4, firstName: 'Kate', notes: '03' },
      { id: 5, firstName: 'Mark', notes: '04' },
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
    return {customers};
  }

  genId(customers: ICustomer[]): number {
    return customers.length > 0 ? Math.max(...customers.map(customer => customer.id)) + 1 : 11;
  }
}
