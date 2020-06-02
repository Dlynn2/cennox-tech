var mysql = require('mysql');
var db;

db = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'cennoxtechdb'
})

module.exports = db;