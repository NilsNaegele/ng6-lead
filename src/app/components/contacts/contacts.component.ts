import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ContactService } from '../../services/contact.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  customers: any[] = [];
  filteredCustomers: any[] = [];
  category: string;

  constructor(private contactService: ContactService,
    private categoryService: CategoryService,
    private route: Router) {
  }

  ngOnInit() {
    this.contactService.fetchAllCustomers().subscribe(customers => {
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

}
