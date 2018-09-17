import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  errorMessage: string;

  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }


  login() {
    console.log(this.email);
    console.log(this.password);
    this.errorMessage = '';
    if (this.email !== '' && this.password !== '') {
      this.authenticationService.attemptAuth('login', this.email, this.password).subscribe(
        (data) => {
          console.log(data);
          if (data) {
            this.router.navigateByUrl('contacts');
          }
        }
      );
    } else {
      this.errorMessage = 'Invalid email and/or password.';
      console.log(this.errorMessage);
      return;
    }
  }

  ngOnInit() {
  }

}
