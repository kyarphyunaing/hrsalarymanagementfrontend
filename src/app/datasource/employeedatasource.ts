import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable } from "rxjs/internal/Observable";
import { of } from "rxjs/internal/observable/of";
import { catchError } from "rxjs/internal/operators/catchError";
import { finalize } from "rxjs/internal/operators/finalize";
import { BodyReponse } from "../model/bodyresponse";
import { Employee } from "../model/employee";
import { EmployeeService } from "../service/employee.service";

export class EmployeeDataSource implements DataSource<Employee>{
    private employeesSubject = new BehaviorSubject<Employee[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public responseBody!: BodyReponse;
    public totalEmployees!: number;
    public loading$ = this.loadingSubject.asObservable();

    constructor(private employeeService: EmployeeService) {}

    connect(collectionViewer: CollectionViewer): Observable<Employee[]> {
        return this.employeesSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.employeesSubject.complete();
        this.loadingSubject.complete();
    }

    loadEmployees(minSalary:number,maxSalary:number,offset:number=0,limit:number=10,orderByColumn:string='+id') {

        this.loadingSubject.next(true);

        this.employeeService.getFilteredEmployeesList(minSalary,maxSalary,offset,limit,orderByColumn).pipe(
            catchError(() => of([])),
            finalize(() => setTimeout(() => {
                this.loadingSubject.next(false)
              }, 300)
            )
        )
        .subscribe(data => {if(data!=null){this.responseBody = new BodyReponse(data);
            this.totalEmployees=this.responseBody.countOfEmployees;
            this.employeesSubject.next(this.responseBody.employees)}}
            );
    } 
}
