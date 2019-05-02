const request = require('request');

const json = {
    "mechP": true,
    "fountainPens": true,
    "cartridgePens": false,
    "woodPencils": false,
    "lead": false,
    "ink": true,
    "penCartridge": false,
    "utility": false,
};

request.get({
    url: 'http://localhost:3002/users/2/collection',
    body: json,
    json: true,
}, function (error, response, body) {
    console.log(body);
});