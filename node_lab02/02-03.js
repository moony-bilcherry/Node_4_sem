const http = require('http');
const fs = require('fs');

http.createServer(function (request, response) {
	if(request.url === '/api/name') {
	  	let html = fs.readFileSync('text.txt');
	  	response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
	  	response.end(html);
	}
}).listen(5000);

console.log('Server running at http://localhost:5000/api/name');