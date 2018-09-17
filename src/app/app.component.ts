import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './services/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  authenticated = false;

  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    this.authenticationService.isAuthenticated.subscribe((isAuth) => {
        if (isAuth) {
          this.authenticated = true;
        }
    });

  }

  logout() {
    this.authenticationService.purgeAuth();
    this.authenticated = false;
    this.router.navigateByUrl('login');
  }

}
