import {Injectable} from '@angular/core';
import {ICustomer} from './customer';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {post} from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customers: ICustomer[] = [];
  private readonly API_URL = 'http://localhost:3000/customer';

  constructor(
    private http: HttpClient
  ) {
  }

  getCustomers(count = 10): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>(this.API_URL).pipe(map(respone => respone.filter((customer, i) => i < count)));
  }

  getCustomerById(id: number): Observable<ICustomer> {
    return this.http.get<ICustomer>(`${this.API_URL}/${id}`);
  }

  createCustomer(customer: ICustomer): Observable<ICustomer> {
    return this.http.post<ICustomer>(this.API_URL, customer);
  }

  deleteCustomer(id): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  updateCustomer(customer: ICustomer): Observable<ICustomer> {
    return this.http.patch<ICustomer>(`${this.API_URL}/${customer.id}`, customer);
  }
}
