import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';

import { Subscription } from 'rxjs';

declare var window: any;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy, AfterViewInit {
  customers: { displayName: string }[];
  filteredCustomers: any[];

  customerSubscription: Subscription;

  constructor(private contactService: ContactService) {
    this.contactService.searchQuery$.subscribe(
      query => {
        if (query) {
          this.filteredCustomers = (query) ?
          this.filteredCustomers
          .filter(c => c.displayName.toLowerCase().includes(query.toLowerCase()))
          : this.customers;
        } else {
          this.filteredCustomers = this.customers;
        }
      });
  }

  ngOnInit() {
    this.customerSubscription = this.contactService.fetchAllCustomers()
    .subscribe(customers => this.filteredCustomers = this.customers = customers);
  }

  ngAfterViewInit() {
    window.componentHandler.upgradeAllRegistered();
  }

  ngOnDestroy() {
    this.customerSubscription.unsubscribe();
  }

}
