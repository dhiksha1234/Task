const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const db = require('./src/config/db')
const bodyParser = require('body-parser');
dotenv.config();

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

 

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('mysql connected');
});

//create db
app.get('/createdb',(req,res)=>{
    let sql = `CREATE DATABASE task3UserTable`;
    db.query(sql, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send("Database created");
    })
});

//create table
app.get('/createUser',(req,res)=>{
    let sql = `CREATE TABLE users(id int AUTO_INCREMENT, firstName VARCHAR(30) UNIQUE, lastName VARCHAR(30), mobileNumber VARCHAR(10), gender VARCHAR(1), email VARCHAR(255) UNIQUE,country VARCHAR(50), PRIMARY KEY(id))`;
    db.query(sql, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send("Table created");
    })
});

//post table
app.post('/addUser',(req,res)=>{
    console.log("inside add");
     
    let user = {
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        mobileNumber:req.body.mobileNumber,
        gender:req.body.gender,
        email:req.body.email,
        country:req.body.country
    }
    let sql = `INSERT INTO users SET ?`;
    db.query(sql, user, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send("User Added created");
    })
});

//get the user table
app.get('/users',(req,res)=>{
    let sql = 'SELECT * FROM users'
     db.query(sql, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send("User fetched");
    })
});

//get the user table based on id
app.get('/users/:id',(req,res)=>{
    let sql = `SELECT * FROM users WHERE id = ${req.params.id}`
     db.query(sql, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send("User fetched based on id");
    })
});

//update user
app.put('/userUpdate/:id',(req,res)=>{
    let newEmail = req.body.email;
    let newMobile = req.body.mobileNumber;
    let sql = `UPDATE users SET email = '${newEmail}' ,mobileNumber = ${newMobile}  WHERE id = ${req.params.id}`
     db.query(sql, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send("User updated");
    })
});

//delete user
app.get('/userDelete/:id',(req,res)=>{
     let sql = `DELETE FROM users WHERE id = ${req.params.id}`
     db.query(sql, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send("delete User based on id");
    })
});


app.get('/',(req,res)=>{
    res.send("CRUD with mysql");
})

var server = app.listen('3010',()=>{
    console.log("connected on 3010");
})

module.exports = server;