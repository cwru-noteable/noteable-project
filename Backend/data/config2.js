const mysql = require('mysql');

//connection information for server
const config = {
    host: 'zxm.pi',
    user: 'team_7',
    password: 'e6444a4a',
    database: 'noteable',
    multipleStatements: true
};

//connection pool as opposed to single connection (a little bit friendlier for multi-user setups)
const pool = mysql.createPool(config);

//make this available to routes
module.exports = pool;
