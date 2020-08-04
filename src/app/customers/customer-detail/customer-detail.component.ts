import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CustomerService } from '../shared/customer.service';
import { ICustomer } from '../shared/customer';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

  customer: ICustomer = { id: 0,
    firstName: '',
    lastName: '',
    email: ''
  };

  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private service: CustomerService, private router: Router) { }

  ngOnInit() {
    this.getCustomerDetails(this.route.snapshot.params['id']);
  }

  getCustomerDetails(id) {
    this.service.getCustomer(id)
      .subscribe(data => {
        this.customer = data;
        console.log(this.customer);
        this.isLoadingResults = false;
      });
  }

  deleteCustomer(id) {
    this.isLoadingResults = true;
    this.service.deleteCustomer(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/customers']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
