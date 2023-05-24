const mysql=require('mysql2')

const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'employee_management',
    password: 'hs@#971890',
    port: '3306'
})

//database connection
db.connect((err)=>{
    if(err)
        throw err;
    else 
        console.log("Successfully database connected")
})

module.exports={db}