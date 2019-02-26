import { Component, OnInit } from '@angular/core';
import {ICustomer} from '../customer';
import {CustomerService} from '../customer.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

  customer: ICustomer;
  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.customerService.getCustomerById(id).subscribe(next => (this.customer = next));
  }

}
