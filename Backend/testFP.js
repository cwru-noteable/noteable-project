const request = require('request');

const json = {
    "mechanicalPencils": true,
    "fountainPens": true,
    "cartridgePens": false,
    "woodPencils": false,
    "lead": false,
    "replacements": true,
    "ink": false,
    "penCartridge": true,
    "utility": false,
};

request.get({
    url: 'http://localhost:3002/collection/Zubair',
    body: json,
    json: true,
}, function (error, response, body) {
    console.log(body);
});