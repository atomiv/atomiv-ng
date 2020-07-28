// SERVICES folder

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { IOrder } from './order'; // or order.model.ts

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl = `${environment.apiUrl}/api/orders`;

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

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




