const request = require('request');

const json = {
    "mechP": false,
    "fountainPens": false,
    "cartridgePens": false,
    "woodPencils": false,
    "lead": false,
    "ink": false,
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