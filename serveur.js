var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile('./index.html', null, function(error, data) {
  	if(error) {
  		res.writeHead(404);
  		res.write('File not found');
  	} else {
  		res.write(data);
  	}
  	res.end();
  });
});
server.listen(8080);