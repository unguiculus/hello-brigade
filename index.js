var express = require('express');
var os = require('os');
var app = express();

app.get('/', function(req, res) {
    res.send('Hello Brigade from ' + os.hostname + '\n');
});

app.get('/health', function(req, res) {
    res.json({ status: 'OK' });
});

app.listen(8081, function() {
    console.log('Hello Brigade app listening on port 8081!');
});