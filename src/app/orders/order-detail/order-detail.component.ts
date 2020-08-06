import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// jc
import { IOrder } from '../shared/order';
import { IOrderItem } from '../shared/order';
import { ICustomer } from '../../customers/shared/customer';
import { OrderService } from '../shared/order.service';
import { CustomerService } from '../../customers/shared/customer.service';

// import { OrderService } from '../shared/order.service';
// import { IOrder } from '../shared/order';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  // jc
  orders: IOrder[] = [];
  customer: ICustomer;

  // order: IOrder[] = [];
  order: IOrder = { id: 0,
    customerId: 0,
    firstName: '',
    notes: '',
    orderItems: [
      // id: 0,
      // firstName: '',
      // notes: ''
    ],
  };

  isLoadingResults = true;

  constructor(
    private service: OrderService,
    // jc
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // jc
    const id = +this.route.snapshot.paramMap.get('id');

    // jc
    this.service.getOrdersByCustomer(id)
      .subscribe((orders: IOrder[]) => {
        this.orders = orders;
      });
    // jc
    this.customerService.getCustomer(id).subscribe((customer: ICustomer) => {
      this.customer = customer;
    });


    this.getOrderDetails(this.route.snapshot.params['id']);
  }

  getOrderDetails(id) {
    this.service.getOrder(id)
      .subscribe(data => {
        this.order = data;
        console.log(this.order);
        this.isLoadingResults = false;
      });
  }

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
