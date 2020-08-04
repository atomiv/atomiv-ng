import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { CustomerService } from '../shared/customer.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {

  customerForm: FormGroup;

  id: number;
  firstName: string;
  lastName: string;
  email: string;

  isLoadingResults = false;

  constructor(private router: Router, private route: ActivatedRoute, private service: CustomerService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getCustomer(this.route.snapshot.params['id']);
    this.customerForm = this.formBuilder.group({
      'id' : [null, Validators.required],
      'firstName' : [null, Validators.required],
      'lastName' : [null, Validators.required],
      // 'notes' : [null, null]
      'email' : [null, Validators.required],
    });
  }

  getCustomer(id) {
    this.service.getCustomer(id).subscribe(data => {
      this.id = data.id;
      this.customerForm.setValue({
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        // notes: data.notes
        email: data.email
      });
    });
  }

  onFormSubmit(form: NgForm) {
    let id = this.id;
    this.isLoadingResults = true;
    this.service.updateCustomer(this.id, form)
      .subscribe(res => {
          // TODO: VC: Handling no-result case
          this.isLoadingResults = false;
          this.router.navigate(['/customers', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  customerDetails() {
    this.router.navigate(['/customers', this.id]);
  }
}
