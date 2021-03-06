import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { ContactService } from '../../services/contact.service';
import { CategoryService } from '../../services/category.service';

declare var window: any;

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'email', 'website', 'phoneNumber', 'lastUpdated'];
  dataSource: MatTableDataSource<any>;

  customers: any[] = [];
  filteredCustomers: any[] = [];
  category: string;
  resultsLength = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private contactService: ContactService,
    private categoryService: CategoryService) {
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
        this.resultsLength = this.filteredCustomers.length;
        this.dataSource = new MatTableDataSource(this.filteredCustomers);
      });
  }

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    this.contactService.fetchAllCustomers().subscribe(customers => {
      this.filteredCustomers = this.customers = customers;
      this.resultsLength = this.filteredCustomers.length;
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
          this.resultsLength = this.filteredCustomers.length;
          this.dataSource = new MatTableDataSource(this.filteredCustomers);
        });
          this.dataSource = new MatTableDataSource(this.filteredCustomers);
    });
  }

  ngAfterViewInit() {
    window.componentHandler.upgradeAllRegistered();
  }

}
