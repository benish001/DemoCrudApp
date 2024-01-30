import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateCustomerService {
  httpHeaders: HttpHeaders = new HttpHeaders({ "Content-Type": "application/json; charset=utf-8" });
  constructor(private http: HttpClient) { }

  insertCustomer(req: any): Observable<any> {
    return this.http.post(environment.webServiceUrl + 'customers', req, { headers: this.httpHeaders })
  }

  updateCustomer(req: any, id: any): Observable<any> {
    return this.http.put(environment.webServiceUrl + 'customers/' + id, req, { headers: this.httpHeaders })
  }

  getCustomerById(req: any): Observable<any> {
    return this.http.get(environment.webServiceUrl + 'customers/' + req)
  }
}
