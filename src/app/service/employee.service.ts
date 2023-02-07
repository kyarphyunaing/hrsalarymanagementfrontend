import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';
@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  private baseURL = "http://localhost:8080/users";

  constructor(private httpClient: HttpClient) { }
  
  /*getEmployeesList(): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.baseURL}/lists`);
  }*/
  getEmployeesList(): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.baseURL}/lists`);
  }
  createEmployee(employee: Employee): Observable<any>{
    let body = { id : `${employee.id}`,
    login : `${employee.login}`,name : `${employee.name}`,
    salary : `${employee.salary}`};
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict)
    };  
    return this.httpClient.post(`${this.baseURL}/user`,body,requestOptions);
  }

  getEmployeeById(id: string): Observable<any>{
    return this.httpClient.get<string>(`${this.baseURL}/user?id=${id}`);
  }

  updateEmployee(employee: Employee): Observable<any>{
    let body = { id : `${employee.id}`,
    login : `${employee.login}`,name : `${employee.name}`,
    salary : `${employee.salary}`};
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };  
    return this.httpClient.patch(`${this.baseURL}/user`,body,requestOptions);
  }

  deleteEmployee(id: string): Observable<any>{
    let body = { id : `${id}`};
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
    const requestOptions = {
      body: body,                                                                                                                                                                             
      headers: new HttpHeaders(headerDict)
    };  
    return this.httpClient.delete(`${this.baseURL}/user`,requestOptions);
  }
  importCSV(csvFile:File):Observable<any>{
    var formData:any=new FormData();
    formData.append("file",csvFile);
    return this.httpClient.post<any>(`${this.baseURL}/upload`,formData);
  
  }
}

