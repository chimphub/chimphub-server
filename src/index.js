var express = require('express');
var fs = require('fs');
var https = require('https');
var bodyParser = require('body-parser');

var app = express();

var key = fs.readFileSync('src/privkey.pem');
var cert = fs.readFileSync('src/cert.pem');
var ca = fs.readFileSync('src/fullchain.pem');
var options = {
    key: key,
    cert: cert,
    ca: ca
};

app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('WELCOME TO THE CHIMPHUB SERVER!');
});

app.post('/', function(req, res) {
    res.send(req.body);
});

app.post('*', function(req, res) {
    res.send('[ERROR] endpoint not found', req.path);
})

https.createServer(options, app).listen(443, function(err) {
    console.log('Server running on port 443');
});
