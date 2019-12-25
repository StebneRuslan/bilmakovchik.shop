import { Injectable } from '@angular/core';
import { HttpHandler, HttpEvent, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UsersService } from '../services/users/users.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private userService: UsersService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
    if (!request.url.includes('login') && !request.url.includes('registration')) {
      request = request.clone({
        headers: request.headers.set('x-api-key', this.userService.getApiKey())
      });
    }
    return next.handle(request);
  }
}
