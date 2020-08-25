import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// jc
import { IOrder } from '../../orders/shared/order';
import { IOrderItem } from '../../orders/shared/order';
import { ICustomer } from '../shared/customer';
import { IProduct } from '../../products/shared/product';
import { OrderService } from '../../orders/shared/order.service';
import { CustomerService } from '../shared/customer.service';
import { ProductService } from '../../products/shared/product.service';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.scss']
})
export class CustomerOrdersComponent implements OnInit {

  // jc
  order: IOrder;
  orders: IOrder[] = [];
  customer: ICustomer;
  products: IProduct[] = [];

  // --------------
  selectedRowIndex = -1;

  pageSize = 5;
  pageSizeOptions = [5, 10, 25, 100];

  isTableHasData = true;


  constructor(
    private orderService: OrderService,
    // jc
    private customerService: CustomerService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // jc
    const id = +this.route.snapshot.paramMap.get('id');

    // jc
    this.orderService.getOrdersByCustomer(id)
      .subscribe((orders: IOrder[]) => {
        this.orders = orders;
        // added below
        console.log(this.orders);
      });
    // jc
    this.customerService.getCustomer(id)
      .subscribe((customer: ICustomer) => {
        this.customer = customer;
      });
    // jc
    this.productService.getProducts()
      .subscribe((products: IProduct[]) => {
        this.products = products;
      });
    /*
    this.service.getProducts()
    .subscribe((res: IProduct[]) => {
      this.dataSource.data = res;
      console.log(this.dataSource);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
    */
  }


}
