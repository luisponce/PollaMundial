var http = require('http');

var server = http.createServer(function(req, res) {
    console.log("req");
    res.writeHead(200);
    var data = '';
    req
            .on('data', function(chunk) {
                data += chunk;
            })
            .on('end', function() {
                console.log('POST data: %s', data);
            });
    res.end('Hello Http');
});
server.listen(8080);


