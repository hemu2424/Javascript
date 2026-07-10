type EmployeeID= number
type Department = "It" | "Hr" | "Finance"

interface Employee{
    id:EmployeeID;
    name:string;
    age:number;
    salary:number;
    department:Department;

}

let employees :Employee[] = []





function addEmployee(employee:Employee):void{
    const check = employees.some((emp)=>{
    return emp.id === employee.id;})

    if(check){
        console.log("already exist")
        return;
    }
    employees.push(employee)
    console.log(`employee added ${employee.name}`)

}

function getEmployee(id: EmployeeID): Employee | undefined
function getEmployee(name: string): Employee | undefined

function getEmployee(value: EmployeeID | string): Employee | undefined {

    if (typeof value === "number") {
        return employees.find((emp) => emp.id === value);
    }

    return employees.find((emp) => emp.name === value);
}


function updateSalary(id:EmployeeID,salary:number): boolean{
    const employee = employees.find((emp)=>emp.id === id);
    if(!employee){
        return false;
    }
    employee.salary = salary;
    console.log(`salary updated for ${employee.name} to ${employee.salary} `)
    return true
}

function deleteEmployee(id:EmployeeID): void{
const check = employees.find((emp)=>emp.id === id);
if(!check){
    console.log("employee does not exist")
    return
}
 employees = employees.filter((emp)=> emp.id !== id)
 console.log(`employee deleted ${id}`)

}
function listEmployee(): void {
    if (employees.length === 0) {
        console.log("List is empty");
        return;
    }

    for (const employee of employees) {
        console.log(
            `Name: ${employee.name}, Age: ${employee.age}, Salary: ${employee.salary}`
        );
    }
}

function getEmployeesByDepartment(department: Department): Employee[] {
    const filteredEmployees = employees.filter(
        emp => emp.department === department
    );

    if (filteredEmployees.length === 0) {
        console.log("Employee does not exist");
    }

    return filteredEmployees;
}

addEmployee({
    id: 1,
    name: "Hemu",
    age: 22,
    salary: 50000,
    department:"Finance"
});

addEmployee({
    id:2,
    name: "Rahul",
    age: 25,
    department:"Hr",
    
    salary: 45000
});

addEmployee({
    id: 3,
    name: "Priya",
    age: 28,
    department:"It",
    
    salary: 60000
});

listEmployee()
deleteEmployee(3)
listEmployee()

updateSalary(1,1000)
listEmployee()
console.log(getEmployeesByDepartment("Finance"))