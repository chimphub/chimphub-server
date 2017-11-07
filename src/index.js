var express = require('express');
var fs = require('fs');
var childProcess = require('child_process');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

var port = process.env.PORT || 443;
var env = process.env.NODE_ENV || 'development';

var key = fs.readFileSync('src/privkey.pem');
var cert = fs.readFileSync('src/cert.pem');
var ca = fs.readFileSync('src/fullchain.pem');
var options = {
    key: key,
    cert: cert,
    ca: ca
};

app.use(cors());

app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send({
        message: 'WELCOME TO THE CHIMPHUB SERVER!',
    });
});

app.post('/', function(req, res) {
    res.send(req.body);
});

app.post('/app/webhooks', function(req, res) {
    if (res.body.repository) {
        var cloneUrl = res.body.repository.clone_url;

        childProcess.exec('git clone ' + cloneUrl, function(err, stdout, stderr) {
            if (err) {
                console.error(err);
                return;
            }

            console.log(stdout);
        });
    }
    res.status(200).send('OK');
})

app.post('*', function(req, res) {
    console.log('[ERROR] endpoint not found', req.path);
    res.send('[ERROR] endpoint not found');
})

if (process.env.NODE_ENV === 'production') {
    var https = require('https');

    https.createServer(options, app).listen(port, function(err) {
        console.log('Server running on port', port);
    });
} else {
    var http = require('http');

    app.listen(port, function(err) {
        console.log('Server running on port', port);
    });
}