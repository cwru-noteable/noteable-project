const port = 3308;  
var mysql = require('mysql');  

var connection = mysql.createConnection({
	host     : 'eecslab-9.case.edu',
	user     : 'team_7',
	password : 'e6444a4a',
	database : 'team_7'
});

connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
 
  console.log('Connected to the MySQL server.');
});

connection.end(function(err) {
	if(err){
		return console.error('error: ' + err.message);
	}
	console.log('Closed database connection');

});
