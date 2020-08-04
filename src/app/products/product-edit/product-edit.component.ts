import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  productForm: FormGroup;

  id: number;
  code: string;
  item: string;
  description: string;
  price: string;
  isListed: string;

  isLoadingResults = false;

  constructor(private router: Router, private route: ActivatedRoute, private service: ProductService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getProduct(this.route.snapshot.params['id']);
    this.productForm = this.formBuilder.group({
      'id' : [null, Validators.required],
      'code' : [null, Validators.required],
      'item' : [null, Validators.required],
      'description' : [null, Validators.required],
      'price' : [null, Validators.required],
      'isListed' : [null, Validators.required],
    });
  }

  getProduct(id) {
    this.service.getProduct(id).subscribe(data => {
      this.id = data.id;
      this.productForm.setValue({
        id: data.id,
        code: data.code,
        item: data.item,
        description: data.description,
        price: data.price,
        isListed: data.isListed
      });
    });
  }

  onFormSubmit(form: NgForm) {
    let id = this.id;
    this.isLoadingResults = true;
    this.service.updateProduct(this.id, form)
      .subscribe(res => {
          // TODO: VC: Handling no-result case
          this.isLoadingResults = false;
          this.router.navigate(['/products', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  productDetails() {
    this.router.navigate(['/products', this.id]);
  }
}
