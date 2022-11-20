require('dotenv').config();
const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : process.env.MYSQL_HOST,
  port     : process.env.MYSQL_PORT,
  user     : process.env.MYSQL_USER,
  password : process.env.MYSQL_PASS,
  database : process.env.MYSQL_DB
});

connection.connect();

console.log(connection) ;

module.exports = connection;
