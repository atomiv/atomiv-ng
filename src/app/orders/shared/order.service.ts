import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { IOrder } from './order';
import { ICustomer } from '../../customers/shared/customer';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl = `${environment.apiUrl}/api/orders`;

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

// TODO: Angular use interceptors for loaders when call API because it can take longer time\
// https://medium.com/angular-in-depth/top-10-ways-to-use-interceptors-in-angular-db450f8a62d6
// .. 9. Loader, 7. Headers (for auth)... 6. Notifications

// Logging - aka Profiling https://medium.com/angular-in-depth/top-10-ways-to-use-interceptors-in-angular-db450f8a62d6
// ... 4. Profiling

// 2. Caching -> TODO: Later: Countries

// 1. Authenitcation -> TODO: Later (tokens and refresh tokens) - real API


// For fake backend return status 200 https://medium.com/angular-in-depth/top-10-ways-to-use-interceptors-in-angular-db450f8a62d6

  // TODO: In production, we would not have catchError but instead global error handling 
  // https://rollbar.com/blog/error-handling-with-angular-8-tips-and-best-practices/ .. HttpErrorInterceptor 
  // (4XX validation error, 5XX unexpected error) - after you connect to real api
  // TODO: Check whether it's possible to do global logging, e.g. logging that REST API call will be executed andhas been finished

  getOrders (): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(apiUrl)
      .pipe(
        tap(_ => console.log('fetched orders')),
        catchError(this.handleError<IOrder[]>('getOrders', []))
      );
  }

  getOrder(id: number): Observable<IOrder> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<IOrder>(url).pipe(
      tap(_ => console.log(`fetched order id=${id}`)),
      catchError(this.handleError<IOrder>(`getOrder id=${id}`))
    );
  }

  // TODO: customerId instead of id
  // REST API: /api/orders?customerId=5 (VC preferred)
  // REST API: /api/customers/5/orders

  // view all customer orders
  // moved to customer service
  getOrdersByCustomer(id: number): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`/api/orders`)
    .pipe (
      map(orders => {
        const custOrders = orders.filter((order: IOrder) => order.customerId === id);
        return custOrders;
      }),
      catchError(this.handleError)
    );
  }

  // jc
  // getProductsByOrder(id: number): Observable<IProduct[]> {
  //   return this.http.get<IProduct[]>(`/api/products`)
  //   .pipe (
  //     map(products => {
  //       const custOrders = products.filter((order: IOrder) => order.customerId === id);
  //       return custOrders;
  //     }),
  //     catchError(this.handleError)
  //   );
  // }

  addOrder (order): Observable<IOrder> {
    return this.http.post<IOrder>(apiUrl, order, httpOptions).pipe(
      tap((newOrder: IOrder) => console.log(`added order w/ id=${newOrder.id}`)),
      catchError(this.handleError<IOrder>('addOrder'))
    );
  }

  updateOrder (id, order): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, order, httpOptions).pipe(
      tap(_ => console.log(`updated order id=${id}`)),
      catchError(this.handleError<any>('updateOrder'))
    );
  }

  deleteOrder (id): Observable<IOrder> {
    const url = `${apiUrl}/${id}`;

    return this.http.delete<IOrder>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted order id=${id}`)),
      catchError(this.handleError<IOrder>('deleteOrder'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}




