const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const db = require('./src/config/db')
const bodyParser = require('body-parser');
const port = 3004;
dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
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

app.get('/firstName',(req,res) =>{
    db.query("Select firstName from users", (err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

//create table
app.get('/createUser',(req,res)=>{
    let sql = `CREATE TABLE users(id int AUTO_INCREMENT, firstName VARCHAR(30) UNIQUE, lastName VARCHAR(30), mobileNumber VARCHAR(255), gender VARCHAR(10), email VARCHAR(255) UNIQUE,country VARCHAR(50), PRIMARY KEY(id))`;
    db.query(sql, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
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
        res.send(result);
    })
});

//get the user table based on id
app.get('/users/:id',(req,res)=>{
    const paramsId = parseInt(req.params.id);
    let sql = `SELECT * FROM users WHERE id = ${paramsId}`
     db.query(sql, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
});

//update user
app.put('/userUpdate/:id',(req,res)=>{
    let newEmail = req.body.email;
    let newMobile = req.body.mobileNumber;
    const paramsId = parseInt(req.params.id);
    let sql = `UPDATE users SET email = '${newEmail}' ,mobileNumber = '${newMobile}'  WHERE id = ${paramsId}`
     db.query(sql, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send("User updated");
    })
});

//delete user
app.delete('/userDelete/:id',(req,res)=>{
    console.log("inside delete");
    const paramsId = parseInt(req.params.id);
     let sql = `DELETE FROM users WHERE id = ${paramsId}`
     db.query(sql, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send("delete User based on id");
    })
});


app.get('/',(req,res)=>{
    res.send("CRUD with mysql");
})

var server = app.listen(port,()=>{
    console.log(`connected on ${port}`);
})

module.exports = server;