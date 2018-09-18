import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

import { ContactService } from '../../services/contact.service';
import { CategoryService } from '../../services/category.service';

import { Subscription } from 'rxjs';

declare var window: any;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy, AfterViewInit {
  customers: any[] = [];
  filteredCustomers: any[];
  category: string;

  customerSubscription: Subscription;

  constructor(private contactService: ContactService, private categoryService: CategoryService) {
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
    .subscribe(customers =>  {
      this.filteredCustomers = this.customers = customers;
      this.categoryService.categoryType$.subscribe(
        type => {
          if (type) {
            this.category = type;
            console.log(this.category);
          }
          if (this.category === 'ALL') {
            this.filteredCustomers = customers;
          } else {
            this.filteredCustomers = (this.category) ?
            this.customers.filter(c => c.contactType === this.category) : this.customers;
          }
        });
    });
  }

  ngAfterViewInit() {
    window.componentHandler.upgradeAllRegistered();
  }

  ngOnDestroy() {
    this.customerSubscription.unsubscribe();
  }

}
