# Backend Folder
## Tools
* ExpressJS
* mySQL
* request
* bodyParser
```
npm install express mysql request body-parser
```
## Architecture
* Built on ExpressJS backend run RESTfully. 
* app.js ties into routes.js, which pulls config from data/config.js
* routes.js hands all data in JSON format to RESTful URLs based on SQL queries 
* Route I-O.txt has descriptions of all in/outputs
## Running Backend
```
node app.js
```
