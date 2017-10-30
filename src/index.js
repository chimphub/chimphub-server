var express = require('express');
var fs = require('fs');
var https = require('https');

var app = express();
var key = fs.readFileSync('src/privkey.pem');
var cert = fs.readFileSync('src/cert.pem');
var ca = fs.readFileSync('src/fullchain.pem');

var options = {
    key: key,
    cert: cert,
    ca: ca
};

app.get('/', function(req, res) {
    res.send('WELCOME TO THE CHIMPHUB SERVER!');
});

app.post('/', function(req, res) {
    res.send('');
});

https.createServer(options, app).listen(443, function(err) {
    console.log('Server running on port 443');
});
