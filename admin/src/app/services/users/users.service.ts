import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { User } from '../../entities/user';
import { LoginModel } from '../../components/login/login.model';

import { Observable, of } from "rxjs";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private uri: string = `${environment.host}:${environment.port}${environment.api}`;
  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  // TODO create interceptor
  public getUsers(): Observable<any> {
    return this.http.get(`${this.uri}/users`);
  }

  public deleteUsers(id): Observable<any> {
    return this.http.delete(`${this.uri}/users/${id}`);
  }

  public createUser(user: User): Observable<any> {
    return this.http.post(`${this.uri}/users`, {user});
  }

  public updateUser(id: string, user): Observable<any> {
    return this.http.put(`${this.uri}/users/${id}`, {user});
  }

  public logIn(user: LoginModel): Observable<any> {
    return this.http.post(`${this.uri}/users/login`, user);
  }

  public logOut(): Observable<any> {
    return of(this.setApiKey(''));
  }

  public getApiKey(): string {
    return this.cookieService.get('api-key');
  }

  public setApiKey(token: string): void {
    this.cookieService.set('api-key', token);
  }
}
