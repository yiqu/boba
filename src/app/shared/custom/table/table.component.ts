import { Component, OnInit, ViewChild, OnChanges, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { environment } from 'src/environments/environment';
import { ITableColumn, TableColumn } from '../../models/table.model';

@Component({
  selector: 'app-shared-table',
  templateUrl: 'table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {

  displayedColumns: string[] = ["name", "example"];
  dataSource: MatTableDataSource<ITableColumn>;

  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator;

  @ViewChild(MatSort, {static: true})
  sort: MatSort;

  @Input()
  tableData: any[] = [];

  constructor() {
    if (!environment.production) {
      this.displayedColumns.push('firebaseId');
    }
  }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.transformData(this.tableData));
  }

  transformData(data: any[]) {
    let res: ITableColumn[] = [];
    data.forEach((d: any) => {
      let rowData = new TableColumn("Kevin", "Me");
      res.push(rowData);
    });
    return res;
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
