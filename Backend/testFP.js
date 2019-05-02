const request = require('request');

const json = {
    "FP_ID": 3,
    "FP_Name": "Faber-Castell Basic",
    "FP_Material": "Plastic",
    "FP_Manufacturer": "Faber-Castell",
    "FP_Ink_Type": "Normal",
};

request.post({
    url: 'http://localhost:3002/FountP',
    body: json,
    json: true,
}, function (error, response, body) {
    console.log(body);
});