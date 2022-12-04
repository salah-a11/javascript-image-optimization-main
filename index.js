var http = require('http');

var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');
const port = process.env.PORT || 3001;

var serve = serveStatic("./");

var app = http.createServer(function(req, res) {
  var done = finalhandler(req, res);
  serve(req, res, done);
});

app.listen(port,() => console.log(`Server running on port ${port}!\nClick http://localhost:${port}/`))