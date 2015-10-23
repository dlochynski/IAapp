#!/usr/bin/env node

var debug = require('debug')('passport-mongo'),
    app = require('./app'),
    https = require('https'),
    fs = require('fs');


var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

app.set('port', process.env.PORT || 3000);

var server = https.createServer(options, app);
server.listen(3030);
// var server = app.listen(app.get('port'), function() {
//   debug('Express server listening on port ' + server.address().port);
// });