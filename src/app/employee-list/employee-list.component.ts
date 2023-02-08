import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDataSource } from '../datasource/employeedatasource';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs/internal/operators/tap';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs/internal/observable/merge';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { filter } from 'rxjs/internal/operators/filter';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'login', 'name', 'salary', 'actions'];
  
  orderByColumn: string = '+id';
  employees: Employee[] = [];
  employeeDataSource!: EmployeeDataSource;
  minSalary: number = 0;
  maxSalary: number = 1000000;
  employeesPerPage: number = 10;
  totalEmployees: any;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild('minimumSalary', { read: ElementRef })
  minimumSalary!: ElementRef;
  @ViewChild('maximumSalary', { read: ElementRef })
  maximumSalary!: ElementRef;
  constructor(private employeeService: EmployeeService,
    private dialog: MatDialog,
    private rout: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    //this.employee = this.rout.snapshot.data["employee"];
   // console.log(this.rout.snapshot.data);
   
    this.employeeDataSource = new EmployeeDataSource(this.employeeService);
   
    this.employeeDataSource.loadEmployees(
      this.minSalary,
      this.maxSalary);
  }

  employeeDetails(id: string) {
    this.router.navigate(['employee-details', id]);
  }

  updateEmployee(id: string) {
    this.router.navigate(['update-employee', id]);
  }

  deleteEmployee(id: string) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Do you want to delete employee id : ' + id + " ?"
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        console.log(confirmed);
        this.employeeService.deleteEmployee(id).subscribe(
          data => {
            this.loadPage();
          }
        );

      }
    });
  }
  ngAfterViewInit() {
    // server-side search
    fromEvent(this.minimumSalary.nativeElement, 'keyup')
    .pipe(
      filter((val: any) => this.minSalary=val.target.value),
      debounceTime(150),
      distinctUntilChanged(),
      tap(() => {
        console.log(this.minSalary);
        this.paginator.pageIndex = 0;
        this.loadPage();
      })
    )
    .subscribe();
    fromEvent(this.maximumSalary.nativeElement, 'keyup')
      .pipe(
        filter((val: any) => this.maxSalary=val.target.value),
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          console.log(this.maxSalary);
          this.paginator.pageIndex = 0;
          this.loadPage();
        })
      )
      .subscribe();
    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadPage())
      )
      .subscribe();
  }
  loadPage() {
   this.sort.direction=='asc'?this.orderByColumn='+'+this.sort.active:this.orderByColumn='-'+this.sort.active;

   this.employeeDataSource.loadEmployees(
      this.minSalary,
      this.maxSalary,
      this.paginator.pageIndex==0?0:this.paginator.pageIndex*10,
      this.paginator.pageSize, this.orderByColumn);
  }
  onSearchChange(searchValue: any): void {
    
  }
  onSearchChangeMax(searchValue: any): void {
    //console.log(searchValue);
  }
}

