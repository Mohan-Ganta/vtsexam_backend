const mysql2 = require('mysql2');
require('dotenv').config();
const connection = mysql2.createPool({
    host: process.env.DB_URL,
    port: 3306, 
    user: process.env.USER_NAME,
    password: process.env.DB_PWD,
    database: 'vtsexamportal'
}).promise();
module.exports = connection;