import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { HttpHeaders, HttpClient, HttpResponse, HttpParams } from '@angular/common/http';

import { JwtService } from './jwt.service';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,
              private jwtService: JwtService,
              private messageService: MessageService) { }

  private setHeaders(): HttpHeaders {
    const httpOptionsPost = {
      headers: new HttpHeaders({'Content-Type': 'application/json',
                                'Accept': 'application/json'
                              })
    };
    if (this.jwtService.getToken()) {
      httpOptionsPost.headers.set('authToken', this.jwtService.getToken());
      console.log(`${this.jwtService.getToken()}`);
    }
    return httpOptionsPost.headers;
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    const httpOptionsGet = {
      headers: new HttpHeaders({'authToken': this.jwtService.getToken()})
    };
    return this.http.get<any>(`${environment.apiURL}${path}`,
                              { headers: httpOptionsGet.headers,  params })
                              .pipe(
                              retry(3),
                              tap(customers => this.log('fetched customer(s)')),
                              catchError(this.handleError('get', [])),
                              map((response: HttpResponse<any>) => response)
                              );
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post<any>(`${environment.apiURL}${path}`,
                                JSON.stringify(body),
                                { headers: this.setHeaders()})
                                .pipe(
                                  retry(3),
                                  tap((customer: any) => this.log(`post with path=${path}`)),
                                  catchError(this.handleError<any>('post')),
                                  map((response: HttpResponse<any>) => response)
                                );
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put<any>(`${environment.apiURL}${path}`,
                                JSON.stringify(body),
                                { headers: this.setHeaders()})
                                .pipe(
                                  retry(3),
                                  tap((customer: any) => this.log(`updated customer id=${customer.id}`)),
                                  catchError(this.handleError<any>('put')),
                                  map((response: HttpResponse<any>) => response)
                                );
  }

  delete(path: string | number): Observable<any> {
    return this.http.delete<any>(`${environment.apiURL}${path}`,
                                  { headers: this.setHeaders()})
                                  .pipe(
                                    retry(3),
                                    tap((customer: any) => this.log(`deleted customer id=${customer.id}`)),
                                    catchError(this.handleError()),
                                    map((response: HttpResponse<any>) => response)
                                  );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
          console.error(error);
          this.log(`${operation} failed ${error.message}`);
          return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`ApiService ${message}`);
  }



}