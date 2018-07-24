import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { FlightRequest } from './flights.reducer';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class FlightRequestService {

  private host: string;
  private port: string;
  private basePath: string;
  private requestUrl: string;

  constructor( private http: HttpClient) {
    this.host = 'localhost';
    this.port = '8080';
    this.basePath = 'requests';
    this.requestUrl = `http://${this.host}:${this.port}/${this.basePath}`;
  }

    /** GET FlightRequest from the server */
  getFlightRequest (): Observable<FlightRequest[]> {
    return this.http.get<FlightRequest[]>(this.requestUrl)
      .pipe(
        catchError<FlightRequest, FlightRequest>(this.handleError('getFlightRequest', {}))
      );
  }
  //////// Save methods //////////
  /** POST: add a new hero to the database */
  createFlightRequest (flight: FlightRequest): Observable<FlightRequest> {
    return this.http.post<FlightRequest>(this.requestUrl, flight, httpOptions)
      .pipe(
        catchError(this.handleError('addFlight', flight))
      );
  }
  //////// Save methods //////////
    /** PUT: add a new hero to the database */
  bookeFlightRequest (flight: FlightRequest): Observable<FlightRequest> {
    return this.http.put<FlightRequest>(this.requestUrl + '/' + flight.id, flight, httpOptions)
      .pipe(
        catchError(this.handleError('addFlight', flight))
      );
  }
// Error handler.
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
