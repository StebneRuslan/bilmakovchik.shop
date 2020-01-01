import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
// TODO import only pick
import * as _ from 'lodash';

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

  public getUsers(): Observable<any> {
    return this.http.get(`${this.uri}/users`);
  }

  public getOneUser(id: string): Observable<any> {
    return this.http.get(`${this.uri}/users/${id}`);
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
    return of(this.cookieService.delete('user'));
  }

  public getActiveUser(fields?: string[]): User {
    return fields ? _.pick(JSON.parse(this.cookieService.get('user')), fields) : JSON.parse(this.cookieService.get('user'));
  }

  public saveActiveUser(user: User): void {
    this.cookieService.set('user', JSON.stringify(user));
  }
}
