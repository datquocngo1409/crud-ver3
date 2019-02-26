import {Component, OnInit} from '@angular/core';
import {ICustomer} from '../customer';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomerService} from '../customer.service';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss']
})
export class CustomerCreateComponent implements OnInit {

  private customers: ICustomer[] = [];
  private customerForm: FormGroup;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(10)]],
      age: [18, [Validators.required, Validators.min(0)]],
      finish: [false]
    });
    this.customerService.getCustomers().subscribe(next => (this.customers = next), error1 => {
      this.customers = [];
      console.log(error1);
    });
  }

  onSubmit() {
    if (this.customerForm.valid) {
      const {value} = this.customerForm;
      this.customerService.createCustomer(value).subscribe(next => {
        this.customers.unshift(next);
        this.customerForm.reset({
          name: '',
          age: 0,
          finish: false
        });
      });
    }
  }

}
