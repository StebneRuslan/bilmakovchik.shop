import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { User } from '../../entities/user';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private uri: string = `${environment.host}:${environment.port}${environment.api}`;
  constructor(private http: HttpClient) { }
  
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
}
