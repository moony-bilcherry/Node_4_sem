const http = require('http');
const fs = require('fs');

http.createServer(function (request, response) {
	if(request.url === '/png') {
    	const fileName = './pic.png';
    	let png = null;

    	fs.stat(fileName, (err, stat) => {
      		if(err) console.error('error', err);
      		else {
        		png = fs.readFileSync(fileName);
        		response.writeHead(200, {'Content-Type': 'image/png', 'Content-Length': stat.size});
        		response.end(png, 'binary');
      		}
    	});
  	}
}).listen(5000);

console.log('Server running at http://localhost:5000/png');