import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { JwtService } from './jwt.service';
import { ApiService } from './api.service';

import { Contact } from '../models/contact';

import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, map, tap, distinctUntilChanged } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject = new BehaviorSubject<any>(new Contact());
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private jwtService: JwtService,
              private apiService: ApiService,
              private route: ActivatedRoute) { }

  private setAuth(user: any) {
    console.log(user.token.authToken);
    this.jwtService.saveToken(user.token.authToken);
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  public purgeAuth() {
    this.jwtService.destroyToken();
    this.currentUserSubject.next(new Contact());
    this.isAuthenticatedSubject.next(false);
  }

  public getCurrentUser(): Contact {
    return this.currentUserSubject.value;
  }

  public attemptAuth(type: string, email: string, password: string): Observable<any> {
      const credentials = {
        username: email,
        password: password
      };
          return this.apiService.post(type, credentials).pipe(
            map((user) => {
              this.setAuth(user);
              return user;
            }
          ));
  }


}
