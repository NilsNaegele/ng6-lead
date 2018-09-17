import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories = [
    { key: 'ALL', value: 'All' },
    { key: 'COMPANY', value: 'Companies' },
    { key: 'PERSON', value: 'People' },
    { key: 'VISITOR', value: 'Visitors'}
  ];

  // observable string source
  private categoryType = new Subject<string>();
  // observable string streams
  categoryType$ = this.categoryType.asObservable();

  // service message commands
  publishCategory(type: string) {
    this.categoryType.next(type);
  }



  constructor() { }

  fetchAllCategories(): {key: string, value: string}[] {
    // get this from rest api
    return this.categories;
  }

}
