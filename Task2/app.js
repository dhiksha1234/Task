const { log } = require('console');
const http = require('http');
const data = require('./data.json');
 const port = process.env.PORT || 3008;

 http.createServer((req,res)=>{

    res.writeHead(200, {"Content-Type":"text/html"});
    console.log(req);   
    const url = req.url;
    if(url === "/trains"){
        res.write(JSON.stringify(data.trains));
         res.end();
    } else if(url === "/passengers"){
        res.writeHead(200,{"Content-Type":"application/json"});
        res.write(JSON.stringify(data.passengers));
    }
    res.end();
 })
 .listen(port,()=>{
    console.log(`connected on ${port}`);
 })