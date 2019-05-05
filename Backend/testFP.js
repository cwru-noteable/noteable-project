const request = require('request');

const json = {
    "target": "CartridgeP",
    "name": "Preppy",
};

request.post({
    url: 'http://localhost:3002/ImpColl/2/add',
    body: json,
    json: true,
}, function (error, response, body) {
    console.log(body);
});