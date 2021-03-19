const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    // node package dotenv, needs to be isntalled at some point 
    password: process.env.MY_PASSWORD,
    database: "employees"
});

connection.connect(function (err) {
    if(err) throw err;
});

module.exports = connection;