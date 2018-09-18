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
    this.customerSubscription = this.contactService.fetchAllCustomers()
    .subscribe(customers => this.filteredCustomers = this.customers = customers);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    window.componentHandler.upgradeAllRegistered();
  }

  ngOnDestroy() {
    this.customerSubscription.unsubscribe();
  }

}
