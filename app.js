const express=require('express');
const bodyParser=require('body-parser')

const db=require('./utils/database').db
const employeeRoutes=require('./routes/employee')
const app=express();
const port=3000      // configuration

app.use(bodyParser.json());

//routing
app.use(employeeRoutes)

//Creating server
app.listen(port,(err)=>{
    if(err)
        throw  err;
    else
        console.log(`server is started at ${port}`)
})