const request = require('request');

const json = {
    "mechP": true,
    "fountainPens": true,
    "cartridgePens": true,
    "woodPencils": true,
    "lead": true,
    "ink": true,
    "penCartridge": true,
    "utility": true,
};

request.get({
    url: 'http://localhost:3002/users/2/collection',
    body: json,
    json: true,
}, function (error, response, body) {
    console.log(body);
});