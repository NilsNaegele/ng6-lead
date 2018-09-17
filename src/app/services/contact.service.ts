import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

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
