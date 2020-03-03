import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BabySitter } from '../models/BabySitter';

@Injectable({
  providedIn: 'root'
})
export class BabySitterService {

  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/BabySitters/';
   }

   getBabySitters(): Observable<BabySitter[]> {
    return this.http.get<BabySitter[]>(this.myAppUrl + this.myApiUrl)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  getBabySitter(Id: number): Observable<BabySitter> {
    return this.http.get<BabySitter>(this.myAppUrl + this.myApiUrl + Id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  saveBabySitter(babysitter): Observable<BabySitter> {
    return this.http.post<BabySitter>(this.myAppUrl + this.myApiUrl, JSON.stringify(babysitter), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updateBabySitter(Id: number, babySitter): Observable<BabySitter> {
    return this.http.put<BabySitter>(this.myAppUrl + this.myApiUrl + Id, JSON.stringify(babySitter), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteBabySitter(Id: number): Observable<BabySitter> {
    return this.http.delete<BabySitter>(this.myAppUrl + this.myApiUrl + Id)
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
