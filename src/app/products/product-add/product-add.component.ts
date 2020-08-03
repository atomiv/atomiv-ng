import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  productForm: FormGroup;

  firstName: string;
  notes: string;

  isLoadingResults = false;

  constructor(private router: Router, private service: ProductService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      'firstName' : [null, Validators.required],
      'notes' : [null, null]
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.service.addProduct(form)
      .subscribe(res => {
          let id = res['id'];
          this.isLoadingResults = false;
          this.router.navigate(['/products', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

}
