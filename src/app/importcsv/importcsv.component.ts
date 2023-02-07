import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-importcsv',
  templateUrl: './importcsv.component.html',
  styleUrls: ['./importcsv.component.css']
})
export class ImportcsvComponent implements OnInit {
  uploadChecked:boolean=false;
  fileName = '';
  file!:File;

  constructor(private employeeService: EmployeeService,
    private router:Router) {
    }

  ngOnInit(): void {
  }
  onFileSelected(event:any) {

    this.file= event.target.files?event.target.files[0]:'';
    this.fileName=this.file.name;
    this.uploadChecked=this.file?true:false;
    
}
onSubmit(){
  if (this.file) {
       
    this.employeeService.importCSV(this.file).subscribe({
     next: (data) => this.goToEmployeeList(),
     error: (e) => console.error(e)
   }
   ); 
 }
}
goToEmployeeList(){
  this.router.navigate(['/employees']);
}

}
