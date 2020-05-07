import { Component, OnInit, ViewChild } from '@angular/core';
import { ICustomer } from './shared/customer';
import { CustomerService } from './shared/customer.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  // highlight row
  selectedRowIndex = -1;

  // MatPaginator Inputs
  // length = 100;
  pageSize = 5;
  pageSizeOptions = [5, 10, 25, 100];

  isTableHasData = true;

  displayedColumns: string[] = [
    'id',
    'firstName',
    'notes', // 'company'
    'action'
  ];

  versions = [
    {'id': '', 'name': 'All results' },
    {'id': '2', 'name': 'Show results cont. "2"' },
    { id: '3', name: 'Filter results cont. "3"' },
  ];
  // selected2 = this.versions;
  selectedVersion = this.versions[0].id;

  isLoadingResults = true;

  dataSource = new MatTableDataSource<ICustomer>();

  // ----------------------------------------------------
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  // add private route: ActivatedRoute ??
  // private trainingService: TrainingService
  constructor(private service: CustomerService) { } // or articleService: ArticleService

  ngOnInit() {
    this.loadData();

    // sorting. or put it in -- ngAfterViewInit()
    this.dataSource.sort = this.sort;
    // pagination
    this.dataSource.paginator = this.paginator;
    // don't need 'dataSource' for it to work
    this.dataSource.paginator._intl.itemsPerPageLabel = 'Results per page:';
    // hide Next and Previous page tooltips
    const paginatorIntl = this.paginator._intl;
    paginatorIntl.nextPageLabel = '';
    paginatorIntl.previousPageLabel = '';
  }

 // or refresh()
  loadData() {
    this.service.getCustomers()
    .subscribe((res: ICustomer[]) => {
      this.dataSource.data = res;
      console.log(this.dataSource);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }


  // for filtering data ----------------------------------------
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim()
    .toLowerCase();
    this.dataSource.filter = filterValue;
    // no results
    if (this.dataSource.filteredData.length > 0) {
      this.isTableHasData = true;
    } else {
      this.isTableHasData = false;
    }
  }

  // highlight row
  highlight(row) {
    this.selectedRowIndex = row.id;
  }

}

