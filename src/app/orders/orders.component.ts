import { Component, OnInit, ViewChild } from '@angular/core';
// jc
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IOrder } from './shared/order';
import { IOrderItem } from './shared/order';
import { ICustomer } from '../customers/shared/customer';
import { OrderService } from './shared/order.service';
import { CustomerService } from '../customers/shared/customer.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  // jc
  orders: IOrder[] = [];
  customer: ICustomer;


  selectedRowIndex = -1;

  pageSize = 5;
  pageSizeOptions = [5, 10, 25, 100];

  isTableHasData = true;

  displayedColumns: string[] = [
    'id',
    'customerId',
    'firstName',
    'notes',
    'action'
  ];

  // JC
  coffees = [
    'Flat White', 'Cappuccino', 'Latte', 'Espresso'
  ];

  versions = [
    {'id': '', 'name': 'All results' },
    {'id': '2', 'name': 'Show results cont. "2"' },
    { id: '3', name: 'Filter results cont. "3"' },
  ];
  selectedVersion = this.versions[0].id;

  isLoadingResults = true;

  dataSource = new MatTableDataSource<IOrder>();


  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private service: OrderService,
    // jc
    private customerService: CustomerService,
    private route: ActivatedRoute ) { }

  ngOnInit() {
    // jc
    const id = +this.route.snapshot.paramMap.get('id');

    this.loadData();

    // jc
    this.service.getOrdersByCustomer(id).subscribe((orders: IOrder[]) => {
      this.orders = orders;
    });
    // jc
    this.customerService.getCustomer(id).subscribe((customer: ICustomer) => {
      this.customer = customer;
    });

    // TODO: Future: Localtional and internationalization
    // Languages (English, Serbian) and language selector
    // and it would have different currency and date and number formatting
    // https://phrase.com/blog/posts/angular-localization-i18n/

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.itemsPerPageLabel = 'Results per page:';
    const paginatorIntl = this.paginator._intl;
    paginatorIntl.nextPageLabel = '';
    paginatorIntl.previousPageLabel = '';
  }

  loadData() {

    this.service.getOrders()
    .subscribe((res: IOrder[]) => {
      this.dataSource.data = res;
      console.log(this.dataSource);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });

  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim()
    .toLowerCase();
    this.dataSource.filter = filterValue;

// this.isTableHasData = this.dataSource.filteredData.length > 0;

    if (this.dataSource.filteredData.length > 0) {
      this.isTableHasData = true;
    } else {
      this.isTableHasData = false;
    }
  }

  highlight(row) {
    this.selectedRowIndex = row.id;
  }

}
