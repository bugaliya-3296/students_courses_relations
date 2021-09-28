const mysql = require('mysql2');

const pool = mysql.createPool({
    host:'localhost',
    user: 'root',
    database:'test',
    password:'Zaq123!@#!@#',
});

module.exports = pool.promise();