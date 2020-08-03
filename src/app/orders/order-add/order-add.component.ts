import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { OrderService } from '../shared/order.service';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.scss']
})
export class OrderAddComponent implements OnInit {

  orderForm: FormGroup;

  firstName: string;
  notes: string;

  isLoadingResults = false;

  constructor(private router: Router, private service: OrderService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      'firstName' : [null, Validators.required],
      'notes' : [null, null]
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.service.addOrder(form)
      .subscribe(res => {
          let id = res['id'];
          this.isLoadingResults = false;
          this.router.navigate(['/orders', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

}
