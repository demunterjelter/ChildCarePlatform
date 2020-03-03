import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Child } from '../models/child';

@Injectable({
  providedIn: 'root'
})
export class ChildService {

  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/Children/';
  }

  getChilds(): Observable<Child[]> {
    return this.http.get<Child[]>(this.myAppUrl + this.myApiUrl)
    .pipe(
      retry(1),
    catchError(this.errorHandler)
    );
  }

  getChild(id: number): Observable<Child> {
    return this.http.get<Child>(this.myAppUrl + this.myApiUrl + id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  saveChild(child): Observable<Child> {
    return this.http.post<Child>(this.myAppUrl + this.myApiUrl, JSON.stringify(child), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  updateChild(id: number, child): Observable<Child> {
    return this.http.put<Child>(this.myAppUrl + this.myApiUrl + id, JSON.stringify(child), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
    );
  }

  deleteChild(id: number): Observable<Child> {
    return this.http.delete<Child>(this.myAppUrl + this.myApiUrl + id)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
