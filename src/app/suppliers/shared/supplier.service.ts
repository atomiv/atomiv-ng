import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { ISupplier } from '../shared/supplier';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl = `${environment.apiUrl}/api/suppliers`;

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) { }

  getSuppliers (): Observable<ISupplier[]> {
    return this.http.get<ISupplier[]>(apiUrl)
      .pipe(
        tap(_ => console.log('fetched suppliers')),
        catchError(this.handleError<ISupplier[]>('getSuppliers', []))
      );
  }

  getSupplier(id: number): Observable<ISupplier> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<ISupplier>(url).pipe(
      tap(_ => console.log(`fetched supplier id=${id}`)),
      catchError(this.handleError<ISupplier>(`getSupplier id=${id}`))
    );
  }

  addSupplier (supplier): Observable<ISupplier> {
    return this.http.post<ISupplier>(apiUrl, supplier, httpOptions).pipe(
      tap((newSupplier: ISupplier) => console.log(`added supplier w/ id=${newSupplier.id}`)),
      catchError(this.handleError<ISupplier>('addSupplier'))
    );
  }

  updateSupplier (id, supplier): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, supplier, httpOptions).pipe(
      tap(_ => console.log(`updated supplier id=${id}`)),
      catchError(this.handleError<any>('updateSupplier'))
    );
  }

  deleteSupplier (id): Observable<ISupplier> {
    const url = `${apiUrl}/${id}`;

    return this.http.delete<ISupplier>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted supplier id=${id}`)),
      catchError(this.handleError<ISupplier>('deleteSupplier'))
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




