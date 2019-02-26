import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CustomerComponent} from './customer/customer.component';
import {CustomerDetailComponent} from './customer-detail/customer-detail.component';
import {CustomerCreateComponent} from './customer-create/customer-create.component';
import {CustomerEditComponent} from './customer-edit/customer-edit.component';

const routes: Routes = [
  {
    path: 'customers',
    component: CustomerComponent
  },
  {
    path: 'customer/:id',
    component: CustomerDetailComponent
  },
  {
    path: 'customers/create',
    component: CustomerCreateComponent
  },
  {
    path: 'customer/edit/:id',
    component: CustomerEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
