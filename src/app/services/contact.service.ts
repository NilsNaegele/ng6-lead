import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { ApiService } from './api.service';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {


  // observable string source
  private searchQuery = new Subject<string>();
  // observable string streams
  searchQuery$ = this.searchQuery.asObservable();

  // service message commands
  publishSearch(query: string) {
    this.searchQuery.next(query);
  }

  constructor(private apiService: ApiService) { }

  public fetchAllCustomers(): Observable<any> {
    return this.apiService.get('contacts').pipe(
      map((customers) => {
        console.log(customers);
        return customers.data;
      })
    );
  }

  public fetchCustomer(id: string): Observable<any[]> {
    return this.apiService.get(`contacts/${id}`).pipe(map((customer) => [customer]));
  }
}
