import {Component, OnInit} from '@angular/core';
import {ICustomer} from '../customer';
import {CustomerService} from '../customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customers: ICustomer[] = [];

  constructor(
    private customerService: CustomerService
  ) {
  }

  ngOnInit() {
    this.customerService.getCustomers().subscribe(next => (this.customers = next), error1 => {
      this.customers = [];
      console.log(error1);
    });
  }

  delete(i: number) {
    const customer = this.customers[i];
    this.customerService.deleteCustomer(customer.id).subscribe(() => {
      this.customers = this.customers.filter(t => t.id !== customer.id);
    });
  }
}
