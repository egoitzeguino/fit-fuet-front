import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/loginService.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private loginService: LoginService) {}

  canActivate(): boolean {
    if (localStorage.getItem('authToken') !== null) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
