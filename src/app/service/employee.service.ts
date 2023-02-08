import { HttpClient, HttpErrorResponse,HttpHeaders, HttpParams } from '@angular/common/http';
import { analyzeFileForInjectables } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BodyReponse } from '../model/bodyresponse';
import { Employee } from '../model/employee';
@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  private baseURL = "http://localhost:8080/users";

  constructor(private httpClient: HttpClient) { }
  
  getEmployeesList(): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.baseURL}/lists`);
  }
  getFilteredEmployeesList(minSalary:number,maxSalary:number,offset:number=0,limit:number=10,orderByColumn:string='+id'): Observable<BodyReponse>{
    return this.httpClient.get<BodyReponse>(`${this.baseURL}/users?minSalary=${minSalary}&maxSalary=${maxSalary}&offset=${offset}&limit=${limit}&sort=${orderByColumn}`);
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

