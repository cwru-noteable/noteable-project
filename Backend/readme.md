# Backend Folder
## Tools
* ExpressJS
* mySQL
* request
* bodyParser
## Architecture
* Built on ExpressJS backend run RESTfully. 
* app.js ties into routes.js, which pulls config from data/config.js
* routes.js hands all data in JSON format to RESTful URLs based on SQL queries 
##Setup
```
npm install express mysql body-parser request
npm init
```