const http = require('http');
const fs = require('fs');

http.createServer(function(request, response) {
	// проверяем, чтобы был путь http://localhost:5000/html
	if(request.url === '/html') {
		let html = fs.readFileSync('./index.html');
		response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
		response.end(html);
	}
}).listen(5000);

console.log('Server running at http://localhost:5000/html');
