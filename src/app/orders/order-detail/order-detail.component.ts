import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// jc
import { IOrder } from '../shared/order';
import { IOrderItem } from '../shared/order';
import { ICustomer } from '../../customers/shared/customer';
import { IProduct } from '../../products/shared/product';
import { OrderService } from '../shared/order.service';
import { CustomerService } from '../../customers/shared/customer.service';
import { ProductService } from '../../products/shared/product.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  // jc
  order: IOrder;
  orders: IOrder[] = [];
  customer: ICustomer;
  customers: ICustomer[] = [];
  products: IProduct[] = [];

  isLoadingResults = true;

  constructor(
    private service: OrderService,
    // jc
    private customerService: CustomerService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.getOrderDetails(this.route.snapshot.params['id']);

    // jc
    // const id = +this.route.snapshot.paramMap.get('id');

    // jc
    // this.customerService.getCustomers()
    //   .subscribe((customers: ICustomer[]) => {
    //     this.customers = customers;
    //   });

    // jc
    // this.productService.getProducts()
    //   .subscribe((products: IProduct[]) => {
    //     this.products = products;
    //   });

    }

    // TODO  issues in console regarding id
  getOrderDetails(id) {
    this.service.getOrder(id)
      .subscribe(data => {
        this.order = data;
        console.log(this.order);
        this.isLoadingResults = false;
      });
  }


  // TODO - add this to services file
  deleteOrder(id) {
    this.isLoadingResults = true;
    this.service.deleteOrder(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/orders']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}


    // jc
    // this.service.getOrdersByCustomer(id)
    //   .subscribe((orders: IOrder[]) => {
    //     this.orders = orders;
    //     // added below
    //     console.log(this.orders);
    //     this.isLoadingResults = false;
    //   });
    // jc
    // this.customerService.getCustomer(id)
    //   .subscribe((customer: ICustomer) => {
    //     this.customer = customer;
    //   });