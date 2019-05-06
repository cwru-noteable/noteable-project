const request = require('request');

const json = {
    "mechanicalPencils": true,
    "fountainPens": true,
    "cartridgePens": true,
    "woodPencils": true,
    "lead": true,
    "replacements": true,
    "ink": true,
    "penCartridge": true,
    "utility": true,
};

request.get({
    url: 'http://localhost:3002/collection/Zubair',
    body: json,
    json: true,
}, function (error, response, body) {
    console.log(body);
});