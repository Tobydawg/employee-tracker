const db = require("./db");
const { prompt } = require("inquirer");
require("console.table");
//init();
function employeeQs() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "Welcome to our employee tracker, what would you like to do?",
      choices: [
        {
          name: "View All Employees",
          value: "View_Employees",
        },
        {
          name: "Create a New Employee",
          value: "New_Employee",
        },
        {
          name: "Update Employee Role",
          value: "Update_Employee_Role",
        },
        {
          name: "View All Role",
          value: "View_Roles",
        },
        {
          name: "Add a Department",
          value: "Add_Department",
        },
        {
          name: "Quit",
          value: "QUIT",
        },
      ],
    },
  ]).then((res) => {
    let choice = res.choice;
    // in order to call the right function when the user choses a given action, we will use switch case
    switch (choice) {
      case "View_Employees":
        viewAllEmployees();
        break;
      case "New_Employee":
        createNewEmployee();
        break;
      case "Update_Employee_Role":
        updateEmployeeRole();
        break;
      case "View_Roles":
        viewRoles();
        break;
      case "Add_Department":
        addDepartment();
        break;
      default:
        quit();
    }
  });
  //View_Employees
  function viewAllEmployees() {
    //retreive the finallemployees data from index.js in db
    db.findAllEmployees()
      // format in proper table format
      .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        console.table(employees);
      })
      .then(() => employeeQs());
  }
  // New_Employee
  function createNewEmployee() {
    prompt([
      {
        name: "first_name",
        message: "what is the first name of employee?",
      },
      {
        name: "last_name",
        message: "what is the last name of the employee?",
      }
    ])    .then(res => {
      let firstName = res.first_name;
      let lastName = res.last_name;
      db.findAllRoles()
        .then(([rows]) => {
          let roles = rows;
          const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id
          }));
          prompt({
            type: "list",
            name: "roleId",
            message: "What is the employee's role?",
            choices: roleChoices
          })
            .then(res => {
              let roleId = res.roleId;
              db.findAllEmployees()
                .then(([rows]) => {
                  let employees = rows;
                  const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                    name: `${first_name} ${last_name}`,
                    value: id
                  }));
                  managerChoices.unshift({ name: "None", value: null });
                  prompt({
                    type: "list",
                    name: "managerId",
                    message: "Who is the employee's manager?",
                    choices: managerChoices
                  })
                    .then(res => {
                      let employee = {
                        manager_id: res.managerId,
                        role_id: roleId,
                        first_name: firstName,
                        last_name: lastName
                      }
                      db.createEmployee(employee);
                    })
                    .then(() => console.log(
                      `Added ${firstName} ${lastName} to the database`
                    ))
                    .then(() => employeeQs())
                })
            })
        })
    })
}
  // Update_Employee_Role
  function updateEmployeeRole() {
    db.findAllEmployees().then(([rows]) => {
      let employees = rows;
      const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
      }));
      prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Who's role would you like to change?",
          choices: employeeChoices,
        },
      ]).then((res) => {
        let employeeId = res.employeeId;
        db.findAllRoles().then(([rows]) => {
          let roles = rows;
          const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id,
          }));
          prompt([
            {
              type: "list",
              name: "roleId",
              message:
                "What role do you want to assign from this list of roles",
              choices: roleChoices,
            },
          ])
            .then((res) => db.updateEmployeeRole(employeeId, res.roleId))
            .then(() => console.log("update employee's role"))
            .then(() => employeeQs());
        });
      });
    });
  }
  // View_Role
  function viewRoles() {
    db.findAllRoles()
      .then(([rows]) => {
        let roles = rows;
        console.log("\n");
        console.table(roles);
      })
      .then(() => employeeQs());
  }
  // Add_Department
  function addDepartment() {
    prompt([
      {
        name: "name",
        message: "What is the name of the department?",
      },
    ]).then((res) => {
      let name = res;
      db.createDepartment(name)
        .then(() => console.log(`Added ${name.name} to the database`))
        .then(() => employeeQs());
    });
  }
  // quit the application
  function quit() {
    console.log("Bye!");
    process.exit();
  }
}
employeeQs();


//break
// const db = require("./db");
// const {prompt} = require("inquirer");
// require("console.table");


// //init();

// function employeeQs() {
//   prompt([ 
//     {
//     type: "list",
//     name: "choice",
//     message: "Welcome to our employee tracker, what would you like to do?",
//     choices: [
//       {
//         name: "View All Employees",
//         value: "View_Employees"
//       },{
//         name: "Create a New Employee", 
//         value: "New_Employee"
//       }, {
//         name: "Update Employee Role",
//         value: "Update_Employee_Role"
//       }, {
//         name: "View All Role",
//         value: "View_Roles"
//       }, {
//         name: "Add a Department",
//         value: "Add_Department"
//        }, {
//         name: "Quit",
//         value: "QUIT"
//       }
     
//   ]
// }

//   ]
//   ) .then(res => {
//     let choice = res.choice;
//     // in order to call the right function when the user choses a given action, we will use switch case 
//     switch (choice) {
//       case "View_Employees":
//       viewAllEmployees();
//       break;
//       case "New_Employee":
//       createNewEmployee();
//       break;
//       case "Update_Employee_Role": 
//       updateEmployeeRole()
//       break;
//       case "View_Roles":
//         viewRoles(); 
//       break;
//       case "Add_Department": 
//       addDepartment();
//       break;
//       default:

//         quit();

//     }
//   }
// )


// //View_Employees
//   function viewAllEmployees() {
//     //retreive the finallemployees data from index.js in db
//     db.findAllEmployees()
//     // format in proper table format
//     .then(([rows]) => {
//       let employees = rows;
//       console.log("\n");
//       console.table(employees);

//     }).then(() => employeeQs())
//   }

// // New_Employee
//   function createNewEmployee() {
//     prompt([
//       {
//         name: "first_name",
//         message: "what is the first name of employee?"
//       },
//       {
//         name: "last_name",
//         message: "what is the last name of the employee?"
//       },
//       {
//        name: "role",
//        type: "list",
//        message: "What is the employees role? (Required)",
//        choices: ["Sales Lead", "Salesperson?", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead"],
                        
//        },
       
//     {
//     name: "department",
//     type: "list",
//     message: "What department does the emoployee beling? (Required)",
//     choices: ["Legal", "Sales?", "Engineering", "Accountancy"],
                        
//      },
                    
//     ]).then(res => {
//       let firstName = res.first_name;
//       let lastName = res.last_name;
//       let employeeRole = res.employee.role;
//       let department = res.employee.department;

//     db.findAllRoles()
//     .then(([rows]) => {
//       let roles = rows;
  
//          })

//     })
//   }


//   function quit() {
    
//   }



// // Update_Employee_Role
// function updateEmployeeRole() {
//   db.findAllEmployees() 
//   .then(([rows]) => {
//     let employees = rows;
//     const employeeChoices = employee.map(({ id, first_name, last_name }) => ({
//       name:   `${first_name} ${last_name}`,
//       value: id
//     }));

//     prompt([
//       {
//         type: "list",
//         name: "employeeId",
//         message: "Who's role would you like to change?",
//         choices: employeeChoices
//       }
//     ])
//     .then(res => {
//       let employeeId = res.employeeId;
//       db.viewAllRoles()
//       .then(([rows]) => {
//         let roles = rows;
//         const roleChoices = roles.map(({ id, title }) => ({
//           name: title,
//           value: id
//         }));

//         prompt([{
//           type: "list",
//           name: "roleId",
//           message: "What role do you want to assign from this list of roles",
//           choices: roleChoices

//         }])
//         .then(res => db.updateEmployeeRole(employeeId, res.roleId))
//         .then(() => console.log("update employee's role"))
//         .then(() => employeeQs())

//       })
//     })

//   })

// }

// // View_Role
// function viewRoles() {
//   db.viewAllRoles()
//   .then(([rows]) => {
//    let roles = rows;
//    console.log("\n");
//    console.table(roles);
   
//   }).then(() => employeeQs())
// }


// // Add_Department

// function addDepartment() {
//   prompt([ {
//     name: "name",
//     message: "What is the name of the department?"
//   }])
//   .then(res => {
//     let name = res;
//     db.createDepartment(name)
//     .then(() => console.log(`Added ${name.name} to the database`))
//     .then(() => employeeQs())
//   })
// }

// // quit the application 
// function quit() {
//   console.log("Bye!");
//   process.exit();
// }
// }

// employeeQs();


//module exports = (inquirer, DB, console.table)















// this will hold the inquirer prompts 
// const inquirer = require('inquirer');
// const mysql = require('mysql2');

// //trying to define these 
// let displayByRole = mysql.displayByRole(`SELECT * FROM role;`);
// let viewAll = mysql.viewAll(`SELECT * FROM;`);
// let displayDept = mysql.displayDept(`SELECT * FROM department;`);

// const employeeQs = () => {
//     return(
//         inquirer
//         .prompt([
         

//   {
//     type: "input",
//     name: "firstName",
//     message: "What is the employees first name? (Required)",
//     validate: (firstNameInput) => {
//       if (firstNameInput) {
//         return true;
//       } else {
//         console.log("THE FIRST NAME PLEASE!");
//         return false;
//       }


//     }
//     },

//       {
//         type: "input",
//         name: "lastName",
//         message: "What is the employees last name? (Required)",
//         validate: (lastNameInput) => {
//           if (lastNameInput) {
//             return true;
//           } else {
//             console.log("THE LAST NAME PLEASE!");
//             return false;
//           }
//           },
//         },
//         {
//             name: "database",
//             type: "list",
//             message: "What would you like to do? (Required)",
//             choices: ["View employee by department?", "View employee by role?", "View all employees" ],
//           },
  

// ])

// .then(function (answers) {
//     //console.log(answers);
//    // objectEmployee.push(answers); //have to get the data from this .then statement -answers..did that by pushing to global var objectEmployee
//     //console.log
//     if (answers.database === "View employee by department?") {
      
//       deptQs(answers);
//     } else if (answers.database === "View employee by role") {
//       roleQs(answers);
//     } else {
//       viewAll(answers);
//     }
//   })
  
// );


// function roleQs() {
//     inquirer
//       .prompt([

//               {
//                 type: "list",
//                 message: "What is the employees role? (Required)",
//                 choices: ["Sales Lead", "Salesperson?", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead"],
                
//               },

//               {
//                 type: "confirm",
//                 message: "Would you like to add another employee in this role?",
//                 name: "answerAddAnother",
//               }   
      
//       .then(function (answers){
//       if (answers.answerAddAnother === true){
//     {
//         inquirer.prompt([
//             {
//             type: "input",
//             name: "firstLast",
//             message: "What is the employees first and last name? (Required)",
//             }
    


//       },
//       },
//     ])
    
//     // a function to display database parameters
//  //.then(function (displayByRole){

//         function deptQs() {
//             inquirer
//               .prompt([
                
        
//                       {
//                         type: "list",
//                         message: "What is the department name? (Required)",
//                         choices: ["Legal", "Sales?", "Engineering", "Accountancy"],
                        
//                       },
                    
//               ])
//               displayDept();
//              // a function to display database parameters    
//              // .then(function (displayByDept){
        


          
          
      
















