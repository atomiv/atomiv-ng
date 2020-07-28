import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { SupplierService } from '../shared/supplier.service';

@Component({
  selector: 'app-supplier-add',
  templateUrl: './supplier-add.component.html',
  styleUrls: ['./supplier-add.component.scss']
})
export class SupplierAddComponent implements OnInit {

  supplierForm: FormGroup;

  firstName: string;
  notes: string;

  isLoadingResults = false;

  constructor(private router: Router, private service: SupplierService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.supplierForm = this.formBuilder.group({
      'firstName' : [null, Validators.required],
      'notes' : [null, null]
    });
  }

  /* createUser(): void {
    this.userService.createUser(this.user)
    .subscribe( data => {
      alert("User created successfully.");
    }); */

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.service.addSupplier(form)
      .subscribe(res => {
          let id = res['id'];
          this.isLoadingResults = false;
          this.router.navigate(['/suppliers', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

}
