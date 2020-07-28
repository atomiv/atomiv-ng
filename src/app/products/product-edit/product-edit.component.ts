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
  firstName: string;
  notes: string;

  isLoadingResults = false;

  constructor(private router: Router, private route: ActivatedRoute, private service: ProductService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getProduct(this.route.snapshot.params['id']);
    this.productForm = this.formBuilder.group({
      'id' : [null, Validators.required],
      'firstName' : [null, Validators.required],
      'notes' : [null, null]
    });
  }

  getProduct(id) {
    this.service.getProduct(id).subscribe(data => {
      this.id = data.id;
      this.productForm.setValue({
        id: data.id,
        firstName: data.firstName,
        notes: data.notes
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
