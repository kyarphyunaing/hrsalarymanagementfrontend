import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[]=[];
  p:number=1;
  employeesPerPage:number=10;
  totalEmployees:any;
  constructor(private employeeService: EmployeeService, 
    private dialog:MatDialog,
    private router: Router) { 
  }

  ngOnInit(): void {
    this.getEmployees();
  }
  private getEmployees(){
    this.employeeService.getEmployeesList().subscribe(data => {
      this.employees = data;
      this.totalEmployees=data.length;
    });
  }

  employeeDetails(id: string){
    this.router.navigate(['employee-details', id]);
  }

  updateEmployee(id: string){
    this.router.navigate(['update-employee', id]);
  }

  deleteEmployee(id: string){
    
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data:{
          message: 'Do you want to delete employee id : '+id+" ?"
      }
      });
       
      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
          if (confirmed) {
            console.log(confirmed);
              this.employeeService.deleteEmployee(id).subscribe(
                data => {
                  this.getEmployees();
                }
              );
              
          }
      });
  }
}

