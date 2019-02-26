import {Component, OnInit} from '@angular/core';
import {ICustomer} from '../customer';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from '../customer.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {

  private customer: ICustomer;
  private customerForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
    const id = +this.route.snapshot.paramMap.get('id');
    this.customerService.getCustomerById(id).subscribe(next => {
      (this.customer = next);
      this.customerForm.patchValue(this.customer);
    }, error1 => this.customer = null);
  }

  onSubmit() {
    if (this.customerForm.valid) {
      const {value} = this.customerForm;
      const data = {
        ...this.customer,
        ...value
      };
      this.customerService.updateCustomer(data).subscribe(next => {
        this.router.navigate(['/customers']);
      });
    }
  }
}
