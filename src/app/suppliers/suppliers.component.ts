import { Component, OnInit, ViewChild } from '@angular/core';
import { ISupplier } from './shared/supplier';
import { SupplierService } from './shared/supplier.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {

  selectedRowIndex = -1;

  pageSize = 5;
  pageSizeOptions = [5, 10, 25, 100];

  isTableHasData = true;

  displayedColumns: string[] = [
    'id',
    'name',
    'city',
    'action'
  ];

  versions = [
    {'id': '', 'name': 'All results' },
    {'id': '2', 'name': 'Show results cont. "2"' },
    { id: '3', name: 'Filter results cont. "3"' },
  ];
  selectedVersion = this.versions[0].id;

  isLoadingResults = true;

  dataSource = new MatTableDataSource<ISupplier>();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private service: SupplierService) { }

  ngOnInit() {
    this.loadData();

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.itemsPerPageLabel = 'Results per page:';
    const paginatorIntl = this.paginator._intl;
    paginatorIntl.nextPageLabel = '';
    paginatorIntl.previousPageLabel = '';
  }

  loadData() {
    this.service.getSuppliers()
    .subscribe((res: ISupplier[]) => {
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
