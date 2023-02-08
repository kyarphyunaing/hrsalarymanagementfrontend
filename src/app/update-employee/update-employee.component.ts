import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { Employee } from '../model/employee';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  id!: string;
  employee: Employee=new Employee();
  constructor(private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.employeeService.getEmployeeById(this.id).subscribe({
      next: (data) => this.employee=data,
      error: (e) => console.error(e)
    }
    );
  }

  onSubmit(){
    this.employeeService.updateEmployee(this.employee).subscribe({
      next: (data) => this.goToEmployeeList(),
      error: (e) => console.error(e)
    }
    );
  }

  goToEmployeeList(){
    this.router.navigate(['/employees']);
  }
}
