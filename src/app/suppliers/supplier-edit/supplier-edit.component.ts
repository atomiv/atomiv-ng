import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { SupplierService } from '../shared/supplier.service';

@Component({
  selector: 'app-supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrls: ['./supplier-edit.component.scss']
})
export class SupplierEditComponent implements OnInit {

  supplierForm: FormGroup;

  id: number;
  name: string;
  city: string;
  notes: string;

  isLoadingResults = false;

  constructor(private router: Router, private route: ActivatedRoute, private service: SupplierService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getSupplier(this.route.snapshot.params['id']);
    this.supplierForm = this.formBuilder.group({
      'id' : [null, Validators.required],
      'name' : [null, Validators.required],
      'city' : [null, Validators.required],
      'notes' : [null, null]
    });
  }

  getSupplier(id) {
    this.service.getSupplier(id).subscribe(data => {
      this.id = data.id;
      this.supplierForm.setValue({
        id: data.id,
        name: data.name,
        city: data.city,
        notes: data.notes
      });
    });
  }

  onFormSubmit(form: NgForm) {
    let id = this.id;
    this.isLoadingResults = true;
    this.service.updateSupplier(this.id, form)
      .subscribe(res => {
          // TODO: VC: Handling no-result case
          this.isLoadingResults = false;
          this.router.navigate(['/suppliers', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  supplierDetails() {
    this.router.navigate(['/suppliers', this.id]);
  }
}
