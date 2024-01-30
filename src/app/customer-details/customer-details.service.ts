import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerDetailsService {
  constructor(private http: HttpClient) { }
  httpHeaders: HttpHeaders = new HttpHeaders({ "Content-Type": "application/json; charset=utf-8" });

  getCustomerDetails(): Observable<any> {
    return this.http.get(environment.webServiceUrl + 'customers')
  }

  deleteCustomer(req: any): Observable<any> {
    return this.http.delete(environment.webServiceUrl + 'customers/' + req)
  }
}
