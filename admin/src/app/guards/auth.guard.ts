import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsersService } from '../services/users/users.service';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationGuard implements CanActivate {

  constructor(
    private router: Router,
    private usersService: UsersService
  ) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.usersService.getActiveUser(['apiKey']).apiKey) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
