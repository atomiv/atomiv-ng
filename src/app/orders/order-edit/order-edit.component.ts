import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { OrderService } from '../shared/order.service';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})
export class OrderEditComponent implements OnInit {

  orderForm: FormGroup;

  id: number;
  firstName: string;
  notes: string;

  isLoadingResults = false;

  constructor(private router: Router, private route: ActivatedRoute, private service: OrderService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getOrder(this.route.snapshot.params['id']);
    this.orderForm = this.formBuilder.group({
      'id' : [null, Validators.required],
      'firstName' : [null, Validators.required],
      'notes' : [null, null]
    });
  }

  getOrder(id) {
    this.service.getOrder(id).subscribe(data => {
      this.id = data.id;
      this.orderForm.setValue({
        id: data.id,
        firstName: data.firstName,
        notes: data.notes
      });
    });
  }

  onFormSubmit(form: NgForm) {
    let id = this.id;
    this.isLoadingResults = true;
    this.service.updateOrder(this.id, form)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/orders', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  orderDetails() {
    this.router.navigate(['/orders', this.id]);
  }
}
