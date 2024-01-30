import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerDetailsService } from './customer-details.service';
@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  public dataSource = new MatTableDataSource;
  displayedColumns: string[] = ['position', 'name', 'age', 'mobile', 'email', 'location', 'action'];
  constructor(private service: CustomerDetailsService, private router: Router) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.service.getCustomerDetails().subscribe(response => {
      this.dataSource = response;
      console.log(response)
    })
  }

  editRecord(obj: any) {
    this.router.navigateByUrl('/create-customer', { state: { action: 'edit', id: obj['_id'] } });
  }

  deleteRecord(obj: any) {
    this.service.deleteCustomer(obj['_id']).subscribe(response => {
      console.log(response)
    })
  }
}
