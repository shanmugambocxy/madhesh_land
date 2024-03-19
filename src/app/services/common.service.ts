import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AppResponse } from '../models/appResponse.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// const API_URL = "http://localhost:5000/";
const localUrl = "http://localhost:5000/";
const API_URL = "http://localhost:5000/";


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }
  apiPutCall(postParam: any, endPoint: string): Observable<AppResponse> {
    let finalURL = API_URL + endPoint;
    return this.http.put<AppResponse>(finalURL, postParam).pipe(catchError(this.handleError));
  }
  apiPostCall(postParam: any, endPoint: string): Observable<any> {
    let finalURL = API_URL + endPoint;
    return this.http.post<any>(finalURL, postParam).pipe(catchError(this.handleError));
  }

  apiFormDataPostCall(postParam: any, endPoint: string): Observable<AppResponse> {
    let finalURL = API_URL + endPoint;
    return this.http.post<AppResponse>(finalURL, postParam).pipe(catchError(this.handleError));
  }

  apiDeleteCall(id: any, endPoint: string): Observable<AppResponse> {
    let finalURL = API_URL + endPoint;
    return this.http.delete<AppResponse>(finalURL + '/' + id).pipe(catchError(this.handleError));
  }

  apiGetCall(endPoint: string): Observable<AppResponse> {
    let finalURL = API_URL + endPoint;
    return this.http.get<AppResponse>(finalURL).pipe(catchError(this.handleError));
  }

  apiGetDetailsCall(id: any, endPoint: string): Observable<AppResponse> {
    let finalURL = API_URL + endPoint;
    return this.http.get<AppResponse>(finalURL + '/' + id).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Something bad happened; please try again later.';

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      //console.error('An error occurred:', error.error.message);
      errorMessage = error.error.message;

    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      //console.error('Else occurred:', error);
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error.result.error}`);
      errorMessage = error.error.result.error;
    }
    // Return an observable with a user-facing error message.
    return throwError(errorMessage);
  }


  //image save api call

  apiPostImageCall(postParam: any, endPoint: any): Observable<any> {
    let finalURL = API_URL + endPoint;
    return this.http.post<any>(finalURL, postParam).pipe(catchError(this.handleError));
  }

  getAwardAmountDeposit(postParam: any, endPoint: any): Observable<any> {
    // let finalURL = API_URL + endPoint;
    let finalURL = localUrl + endPoint;

    return this.http.get<any>(finalURL).pipe(catchError(this.handleError));

    // return this.http.post<any>(finalURL, postParam).pipe(catchError(this.handleError));

  }
  aws_SecretKey(endPoint: string): Observable<AppResponse> {
    let finalURL = API_URL + endPoint;
    return this.http.get<AppResponse>(finalURL).pipe(catchError(this.handleError));
  }

}
