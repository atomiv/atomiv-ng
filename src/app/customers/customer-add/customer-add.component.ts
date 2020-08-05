import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { CustomerService } from '../shared/customer.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent implements OnInit {

  customerForm: FormGroup;

  firstName: string;
  lastName: string;
  email: string;

  isLoadingResults = false;

  constructor(private router: Router, private service: CustomerService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      'firstName' : [null, Validators.required],
      'lastName' : [null, Validators.required],
      'email' : [null, Validators.required],
      // 'notes' : [null, null]
    });
  }

  // TODO
  /* createUser(): void {
    this.userService.createUser(this.user)
    .subscribe( data => {
      alert("User created successfully.");
    }); */

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.service.addCustomer(form)
      .subscribe(res => {
          let id = res['id'];
          this.isLoadingResults = false;
          this.router.navigate(['/customers', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

}
