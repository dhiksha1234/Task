const mysql = require('mysql2');


const db = mysql.createConnection({
    // host: process.env.MYSQL_HOST,
    // user: process.env.MYSQL_USER,
    // password: process.env.MYSQL_PASSWORD,
    // database: process.env.MYSQL_DATABASE, 
    host: 'localhost',
    user: 'dhiksha',
    password: 'Helloworld@123',
    database: 'task3UserTable', 

 });

 module.exports = db;