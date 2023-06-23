const express = require('express');
const app = express();
const port = 3009;
const api = `https://api.publicapis.org/entries`;

app.get('/',(req,res)=>{
    res.send("Home");
})

//get method
app.get('/get', (req,res)=>{
    res.send("inside get");
})

//post method
app.post('/post',(req,res)=>{
    res.send("inside post");
})

 // put method
app.put('/put/:id', (req, res) => {
    res.send("inside put");
});

 // delete method
 app.delete('/put/:id', (req, res) => {
    res.send("inside delete");
});

app.listen(port, ()=>{
    console.log("Listening on 3009");
})