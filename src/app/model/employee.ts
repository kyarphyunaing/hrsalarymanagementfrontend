export class Employee {
    id!: string;
    login!: string;
    name!: string;
    salary!: number;
   
    constructor(employee?: any) {
       if(employee){
        this.id = employee.id;
        this.login = employee.login;
        this.name = employee.name;
        this.salary = employee.salary;
       }
    }
}
