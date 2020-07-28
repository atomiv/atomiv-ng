// SERVICES folder

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { IProduct } from '../shared/product'; // or product.model.ts

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl = `${environment.apiUrl}/api/products`;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts (): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(apiUrl)
      .pipe(
        tap(_ => console.log('fetched products')),
        catchError(this.handleError<IProduct[]>('getProducts', []))
      );
  }

  getProduct(id: number): Observable<IProduct> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<IProduct>(url).pipe(
      tap(_ => console.log(`fetched product id=${id}`)),
      catchError(this.handleError<IProduct>(`getProduct id=${id}`))
    );
  }

  addProduct (product): Observable<IProduct> {
    return this.http.post<IProduct>(apiUrl, product, httpOptions).pipe(
      tap((newProduct: IProduct) => console.log(`added product w/ id=${newProduct.id}`)),
      catchError(this.handleError<IProduct>('addProduct'))
    );
  }

  updateProduct (id, product): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, product, httpOptions).pipe(
      tap(_ => console.log(`updated product id=${id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  deleteProduct (id): Observable<IProduct> {
    const url = `${apiUrl}/${id}`;

    return this.http.delete<IProduct>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<IProduct>('deleteProduct'))
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




