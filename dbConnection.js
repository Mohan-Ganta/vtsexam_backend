const mysql2 = require('mysql2');
require('dotenv').config();
const connection = mysql2.createConnection({
    host: process.env.DB_URL,
    port: 3306, 
    user: process.env.USER_NAME,
    password: process.env.DB_PWD,
    database: 'vtsassessment'
}).promise();

connection.connect((err)=>{
    if(err)
    console.log(err)
    else
    console.log("ok bhayya")
})
module.exports = connection;