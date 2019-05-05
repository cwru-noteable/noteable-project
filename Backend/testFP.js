const request = require('request');

const json = {
    "target": "MechanicalP",
    "name": "ClearPoint",
};

request.post({
    url: 'http://localhost:3002/ImpColl/3/add',
    body: json,
    json: true,
}, function (error, response, body) {
    console.log(body);
});