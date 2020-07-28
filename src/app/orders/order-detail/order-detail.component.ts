import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { OrderService } from '../shared/order.service';
import { IOrder } from '../shared/order';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  order: IOrder = { id: 0,
    firstName: '',
    notes: ''
  };

  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private service: OrderService, private router: Router) { }

  ngOnInit() {
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
