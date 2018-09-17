import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  customers: any[] = [];

  constructor(private contactService: ContactService, private route: Router) { }

  ngOnInit() {
    this.contactService.fetchAllCustomers().subscribe(customers => {
      this.customers = customers;
        // this.filteredCustomers = (this.category) ?
        //     this.customers.filter(c => c.contactType === this.category) : this.customers;
    });
  }

}
