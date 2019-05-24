const mysql = require('mysql');

//connection information for server
const config = {
    host: 'localhost',
    user: 'team_7',
    password: 'e6444a4a',
    database: 'team_7',
    multipleStatements: true
};

//connection pool as opposed to single connection (a little bit friendlier for multi-user setups)
const pool = mysql.createPool(config);

//make this available to routes
module.exports = pool;
