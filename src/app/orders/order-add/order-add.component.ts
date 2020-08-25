import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, FormArray, NgForm, Validators } from '@angular/forms';

import { OrderService } from '../shared/order.service';
import { CustomerService } from '../../customers/shared/customer.service';
import { ProductService } from '../../products/shared/product.service';
import { IOrder } from '../shared/order';
import { ICustomer } from '../../customers/shared/customer';
import { IProduct } from '../../products/shared/product';

import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.scss']
})
export class OrderAddComponent implements OnInit {

  // -----------------
  // jc
  order: IOrder;
  orders: IOrder[] = [];

  // customer form field dropdown
  customers: ICustomer[] = [];
  customer: ICustomer;

  // product form field dropdown
  products: IProduct[] = [];
  product: IProduct;

  dataSource = new MatTableDataSource<IOrder>();

  // ---------------------------

  orderForm: FormGroup;

  firstName: string;
  notes: string;

  isLoadingResults = false;

  constructor(private router: Router, private service: OrderService,
    private customerService: CustomerService,
    private productService: ProductService,

    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.orderForm = this.formBuilder.group({
      // 'firstName' : [null, Validators.required],
      // 'notes' : [null, null]
      'id' : [null, Validators.required],
      'customerId' : [null, null],
      orderItems: this.formBuilder.array([
      ]),
    });

    // jc
    this.customerService.getCustomers()
      .subscribe((customers: ICustomer[]) => {
        this.customers = customers;
      });

    this.productService.getProducts()
      .subscribe((products: IProduct[]) => {
        this.products = products;
      });
  }

  // jccc
  get hobb(): FormArray {
    return this.orderForm.get('orderItems') as FormArray;
  }

  // jccc
  addOrderItem() {
    // const hobb = this.orderForm.controls.orderItems as FormArray;
    // added 'this.push' instead of 'push' when removed const above
    this.hobb.push(this.formBuilder.group({
      id: '',
      productId: '',
      quantity: '',
    }));
  }

  removeOrderItem(i: number) {
    this.hobb.removeAt(i);
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
