const port = 3306;
const mysql = require('mysql');

const config = {
	host: 'eecslab-9.case.edu',
	user: 'team_7',
	password: 'e6444a4a',
    database: 'team_7',
    multipleStatements: true
};

const pool = mysql.createPool(config);

module.exports = pool;
