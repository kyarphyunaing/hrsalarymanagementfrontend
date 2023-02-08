import { Employee } from "./employee";

export class BodyReponse {
    countOfEmployees!: number;
    employees!: Employee[];
    constructor(response: any) {
        this.countOfEmployees = response.countOfEmployees;
        this.employees = response.employees.map((a: any) => new Employee(a));
    }
}
