const express = require('express');
const data = require('./user.json');
const bodyParser = require('body-parser');
const app = express();
const port = 3009;


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
 
app.get('/',(req,res)=>{
    res.send("Home");
})

//get method
app.get('/getUser', (req,res)=>{
    res.send(data);
})

// get based on  id 
app.get('/getUser/:id', function(req, res){
    let user = data.find((u) => u.id === parseInt(req.params.id));
    res.send(user);
    if (!user){
        res.send("No user with that id"); 
    }
})

//post method
app.post('/postUser',(req,res)=>{
    let user = {
        id:data.length+1,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        mobileNumber:req.body.mobileNumber,
        gender:req.body.gender,
        email:req.body.email,
        country:req.body.country
    }
    data.push(user);

    res.send(data);
})

 // put method
app.put('/putUser/:id', (req, res) => {
    let user = data.find((u)=> u.id === parseInt(req.params.id));
    if (!user) {
        res.send("No user with that id");
        return;
    }
    user.email = req.body.email;
    user.mobileNumber = req.body.mobileNumber;
    res.send(data);
 });

 // delete method
 app.delete('/deleteUser/:id', (req, res) => {
    let user = data.find((u)=>
        u.id === parseInt(req.params.id)
    )
    console.log(req.params.id);
    if (!user) {
        res.send("No user with that id");
        return;
    }
    const indexNum = data.indexOf(user);
    console.log(indexNum);
     data.splice(indexNum,1);
    res.send(data);
 });

app.listen(port, ()=>{
    console.log("Listening on 3009");
})