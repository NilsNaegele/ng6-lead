import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  id: string;
  customer: any;

  constructor(private route: ActivatedRoute, private contactService: ContactService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.contactService.fetchCustomer(this.id).subscribe((customer) => {
      this.customer = customer;
      console.log(this.customer);
    });
  }

}
