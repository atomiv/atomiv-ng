import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// jc
import { IOrder } from '../shared/order';
import { ICustomer } from '../../customers/shared/customer';
import { IProduct } from '../../products/shared/product';
import { OrderService } from '../shared/order.service';
import { CustomerService } from '../../customers/shared/customer.service';
import { ProductService } from '../../products/shared/product.service';

import { MatTableDataSource } from '@angular/material/table';

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

  // --------------
  // selectedRowIndex = -1;

  // pageSize = 5;
  // pageSizeOptions = [5, 10, 25, 100];

  isTableHasData = true;

  // displayedColumns: string[] = [];

  displayedColumns: string[] = [
    // 'InnerTable',
    'id',
    'productId',
    'quantity',

    // 'firstName',
    // 'totalPrice',
    // 'action'
  ];

  // isLoadingResults = true;

  dataSource = new MatTableDataSource<IOrder>();
  // --------------

  constructor(
    private service: OrderService,
    // jc
    private customerService: CustomerService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    // jc
    const id = +this.route.snapshot.paramMap.get('id');

    // this.loadData();

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    this.getOrderDetails(this.route.snapshot.params['id']);

    // jc
    this.customerService.getCustomers()
    .subscribe((customers: ICustomer[]) => {
      this.customers = customers;
    });

    // jc
    this.productService.getProducts()
    .subscribe((products: IProduct[]) => {
      this.products = products;
    });

    // ------------
    // this.service.getOrders()
    // .subscribe((res: IOrder[]) => {
    //   this.dataSource.data = res;
    //   console.log(this.dataSource);
    //   this.isLoadingResults = false;
    // });

    this.service.getOrders()
    .subscribe(
      // data => {
      //   this.dataSource = new MatTableDataSource<IOrder>([id]);
      // }

      // (res: IOrder) => {
      // this.dataSource.data = res;
      // console.log(this.dataSource);
      // this.isLoadingResults = false;
      // }

      // data => {
      //   this.dataSource = new MatTableDataSource<IOrder>(data);
      // }

      // (res: IOrder[])
      // BELOW WORKS to get all data
      /*
      data => {
        this.dataSource = new MatTableDataSource(data);
      }
      */
      data => {
        // d => d.customerId > 1
        // d => d.id === 1
        // d.id === id
        const filteredData = data.filter(d => d.id === id);
        this.dataSource = new MatTableDataSource(filteredData);
        // this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
      }


    );

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


  loadData() {
    // added
    // const id = +this.route.snapshot.paramMap.get('id');
    // this.service
    this.service.getOrders()
    .subscribe((res: IOrder[]) => {
      this.dataSource.data = res;
      console.log(this.dataSource);
      this.isLoadingResults = false;
    });
    /*
    this.service.getOrders()
    .subscribe((res: IOrder[]) => {
      this.dataSource.data = res;
      console.log(this.dataSource);
      this.isLoadingResults = false;
    });
    */
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
