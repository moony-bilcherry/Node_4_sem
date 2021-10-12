var http = require('http');

http.createServer(function(request, response){
    response.writeHead(200, {'Content-Type':'text/html'});
    response.end('<h1 style="color: #011627; font-family: \'Lucida Sans\'">Hello World!!</h1>\n');
}).listen(3000);

console.log('Server running at http://localhost:3000/');