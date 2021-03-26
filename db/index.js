// requiring in the connection file in order to communicate to db
const connection = require("./connection");

// creating a class
class Database {
    constructor(connection) {
        this.connection = connection;
    };

// View_Employees
// using the table roles and departments so we can dsiplay roles, salaries, departments, and respective managers 
// using CONCAT & left joins 
findAllEmployees() {
    return this.connection.promise().query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name,' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id=department.id LEFT JOIN employee manager on manager.id=employee.manager_id;"
    )
    };

//New_Employee
createEmployee(employee) {
    return this.connection.promise().query(
        "INSERT INTO employee Set ?", employee);
        
}


// Update_Employee_Role
findEmployeeRole(employeeId, roleId) {
    return this.connection.promise().query(
        "UPDATE employee SET role_id = ? WHERE id = ?"
        [roleId,employeeId]
        )    
}


// View_Roles
viewAllRoles(){
    return this.connection.promise().query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department department ON role.department_id = department.id WHERE department.id = ?");
}

// Add_Department
createDepartment(department) {
    return this.connection.promise().query("INSERT INTO department SET ?", department)
        
    

}


// findAllDepartments(){
//     return this.connection.promise().query(
//         "SELECT department.name FROM department AS department"
//         )

// }

// // same as adding an employee
// findAllRoles() {
//     return this.connection.promise().query(     //"INSERT INTO employee SET ?", employee)
// "SELECT role.department, role.id, role.title, role.salary FROM role"
//     )
// }

//??
// findAllPossibleManagers(employeeId) {
//     return this.connection.promise().query(
//        "SELECT manager.id, manager.first_name, manager.last_name, role.title, department.name, FROM employees WHERE (employee_id IN (SELECT manager_id FROM employees));"
//     )

    
// };
//SELECT first_name, last_name 
// FROM employees 
// WHERE (employee_id IN (SELECT manager_id FROM employees));
