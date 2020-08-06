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

  code: string;
  productName: string;
  description: string;
  price: string;
  isListed: string;

  isLoadingResults = false;

  constructor(private router: Router, private service: ProductService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      'code' : [null, Validators.required],
      'productName' : [null, Validators.required],
      'description' : [null, Validators.required],
      'price' : [null, Validators.required],
      'isListed' : [null, Validators.required],
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
