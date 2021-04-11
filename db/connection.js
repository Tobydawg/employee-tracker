// const mysql = require("mysql");

// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     // node package dotenv, needs to be isntalled at some point 
//     password: process.env.MY_PASSWORD,
//     database: "employees"
// });

// connection.connect(function (err) {
//     if(err) throw err;
// });

// module.exports = connection;

const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    // node package dotenv, needs to be isntalled at some point if you want to use .env 
    password: "password",
    database: "employees"
});
connection.connect(function (err) {
    if(err) throw err;
});
module.exports = connection;