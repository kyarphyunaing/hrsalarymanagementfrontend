import { Component, OnInit } from '@angular/core';
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
  err:boolean=false;

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
     next: (data) => {this.err=false,this.goToEmployeeList()},
     error: (e) => {console.error(e);this.err=true;}
   }
   ); 
 }
}
goToEmployeeList(){
  this.router.navigate(['/employees']);
}

}
