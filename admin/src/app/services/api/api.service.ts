import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private uri: string = `${environment.host}:${environment.port}${environment.api}`;
  constructor(
    private http: HttpClient
  ) { }
  
  public get(path: string, options?: any): Observable<any> {
    return this.http.get(`${this.uri}${path}`, options)
  }
  
  public post(path: string, data?: any, options?: any): Observable<any> {
    return this.http.post(`${this.uri}${path}`, data, options)
  }
  
  public put(path: string, data?: any, options?: any): Observable<any> {
    return this.http.put(`${this.uri}${path}`, data, options)
  }
  
  public delete(path: string): Observable<any> {
    return this.http.delete(`${this.uri}${path}`)
  }
}
