const http = require('http');
const fs = require('fs');
const url = require('url');

let data = require('./db.js');
let db = new data.DB();

// слушатели событий

db.on('GET', (request, response) => {
	console.log('GET called');
	response.end(JSON.stringify(db.select()));
})

db.on('POST', (request, response) => {
	console.log('POST called');
	request.on('data', data => {
        let row = JSON.parse(data);
        row.id = db.getIndex();
        response.end(JSON.stringify(db.insert(row)));
    });
})

db.on('PUT', (request, response) => {
	console.log('PUT called');
	request.on('data', data => {
        let row = JSON.parse(data);
        response.end(JSON.stringify(db.update(row)));
    });
})

db.on('DELETE', (request, response) => {
	console.log('DELETE called');
	let id = url.parse(request.url, true).query.id;
	if(url.parse(request.url, true).query.id === undefined) {
		response.end('{"ERROR": "parameter not provided"}');
	}
	if (url.parse(request.url, true).query.id !== null) {
		let id = +url.parse(request.url, true).query.id;
		if (Number.isInteger(id)) {
			response.end(JSON.stringify(db.delete(id)));
		}
	}
})

http.createServer(function (request, response) {
	if(url.parse(request.url).pathname === '/api/db') {
		// генерация события, имя события - строка request.method
        db.emit(request.method, request, response);
  	}
	if (request.url === '/') {
        let html = fs.readFileSync('./04-02.html');
        response.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
        response.end(html)
    }
}).listen(5000);

console.log('Server running at http://localhost:5000/api/db');