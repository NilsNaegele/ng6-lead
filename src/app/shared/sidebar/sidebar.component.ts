import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ContactService } from '../../services/contact.service';
import { CategoryService } from '../../services/category.service';

import { Observable } from 'rxjs';
declare var window: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit {
  user$: Observable<any>;
  id: string;
  customers: any;
  categories: any;
  userProfilePicture: string;

  constructor(private authenticationService: AuthenticationService,
              private contactService: ContactService,
              private categoryService: CategoryService) {
    this.authenticationService.isAuthenticated.subscribe(authState => {
      if (authState) {
        this.user$ = this.authenticationService.currentUser;
        this.user$.subscribe((user) => {
          if (user.user) {
            this.id = user.user.id;
          }
        });
      }
    });
  }

  select(category: string) {
    console.log(category);
    this.categoryService.publishCategory(category);
  }

  ngOnInit() {
    this.contactService.fetchAllCustomers().subscribe((customers) => {
      this.customers = customers;
      console.log(this.customers);
      this.customers.forEach((customer) => {
        if (customer.assignedTo === this.id) {
          this.userProfilePicture = customer.profilePicture;
        }
      });
    });
    this.categories = this.categoryService.fetchAllCategories();
  }

  ngAfterViewInit() {
    window.componentHandler.upgradeAllRegistered();
  }

}
