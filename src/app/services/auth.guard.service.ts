import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from './authentication.service';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  canActivate(route ) {
    return this.authenticationService.isAuthenticated.pipe(
      map(user => {
        console.log(user);
      if (user) {
          return true;
      }
      this.router.navigate(['/login']);
      return false;
    }));
  }

}
