import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
declare var window: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  constructor(private contactService: ContactService) { }

  filter(query: string) {
    console.log(query);
    this.contactService.publishSearch(query);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    window.componentHandler.upgradeAllRegistered();
  }

}
