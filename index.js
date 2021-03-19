const db = require(".db");
const {prompt} = require("inquirer");

require("console.table");

init();

function employeeQs() {
  prompt([ 
    {
    type: "list",
    name: "choice",
    message: "Welcome to our employee tracker, what would you like to do?",
    choices: [
      {
        name: "View All Employees",
        value: "View_Employees"
      },{
        name: "Create a New Employee", 
        value: "New_Employee"
      }, {
        name: "Update Employee Role",
        value: "Update_Employee_Role"
      }, {
        name: "View All Role",
        value: "View_Roles"
      }, {
        name: "Add a Departmenr",
        value: "Add_Department"
       }, {
        name: "Quit",
        value: "QUIT"
      }
     
  ]
}
  ]
  ) .then(res => {
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
      break;
      case "View_Roles":
        viewRoles(); 
      break;
      case "Add_Department": 
      break;
      default:
        quit();

    }
  }
)


//View_Employees
  function viewAllEmployees() {
    //retreive the finallemployees data from index.js in db
    db.findAllEmployees()
    // format in proper table format
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employee);

    }).then(() => employeeQs())
  }

// New_Employee
  function createNewEmployee() {
    prompt([
      {
        name: "first_name",
        message: "what is the first name of employee?"
      },
      {
        name: "last_name",
        message: "what is the last name of the employee?"
      },
      {
       name: "role",
       type: "list",
       message: "What is the employees role? (Required)",
       choices: ["Sales Lead", "Salesperson?", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead"],
                        
       },
       
    {
    name: "department",
    type: "list",
    message: "What department does the emoployee beling? (Required)",
    choices: ["Legal", "Sales?", "Engineering", "Accountancy"],
                        
     },
                    
    ]).then(res => {
      let firstName = res.first_name;
      let lastName = res.last_name;
      let employeeRole = res.employee.role;
      let department = res.employee.department;

    db.findAllRoles()
    .then(([rows]) => {
      let roles = rows;
  
         })

    })
  }


  function quit() {
    
  }



// Update_Employee_Role


// View_Role
function viewRoles() {
  db.viewAllRoles()
  .then(([rows]) => {
   let roles = rows;
   console.log("\n");
   console.table(roles);
   
  }).then(() => employeeQs)
}


// Add_Department





















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
        


          
          
      
















// // it's  switch cases