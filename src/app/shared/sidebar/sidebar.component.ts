import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

import { Observable } from 'rxjs';
import { ContactService } from '../../services/contact.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user$: Observable<any>;
  id: string;

  customers: any;
  userProfilePicture: string;

  constructor(private authenticationService: AuthenticationService,
              private contactService: ContactService) {
    this.authenticationService.isAuthenticated.subscribe(authState => {
      if (authState) {
          this.user$ = this.authenticationService.currentUser;
          this.user$.subscribe((user) => {
            this.id = user.user.id;
          });
      }
    });
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
  }

}
