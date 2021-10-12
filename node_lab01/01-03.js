var http = require('http');

let head = (request) => {
	let rc = '';
	for (let key in request.headers)
		rc += '<h3><span style="color: #2ec4b6;">' + key + ':</span> ' + request.headers[key] + '</h3>';
	return rc;
};

http.createServer(function(request, response) {
	let body = '';
	request.on('data', str => {
		body += str;
		console.log('data', body);
	});

	response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
	
    request.on('end', () => response.end(
			'<!DOCTYPE html><html lang=\"en\"><head><title>Node 01-03</title></head>' +
			'<body style="background: #f5f5f5; color: #011627; font-family: \'Lucida Sans\'">' +
			'<h1>Request structure</h1>' +
			'<h3><span style="color: #8980f5;">METHOD:</span> ' + request.method + '</h3>' +
			'<h3><span style="color: #8980f5;">URI:</span> ' + request.url + '</h3>' +
			'<h3><span style="color: #8980f5;">VERSION:</span> ' + request.httpVersion + '</h3>' +
			'<h3><span style="color: #8980f5;">HEADERS:</span> ' + head(request) + '</h3>' +
			'<h3><span style="color: #8980f5;">BODY:</span> ' + body + '</h3>' +
			'</body>' +
			'</html>'
		)
	)
}).listen(3000);

console.log('Server running at http://localhost:3000/');
