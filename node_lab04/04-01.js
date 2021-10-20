const http = require('http');
const fs = require('fs');
const url = require('url');

let data = require('./db.js');
let db = new data.DB();

db.on('GET', (request, response) => {
	console.log('DB.GET called');
	response.end(JSON.stringify(db.select()));
})

db.on('POST', (request, response) => {
	console.log('DB.POST called');
	request.on('data', data => {
        let row = JSON.parse(data);
        row.id = db.getIndex();
        db.insert(row);
        response.end(JSON.stringify(row));
    });
})

db.on('PUT', (request, response) => {
	console.log('DB.PUT called');
	
})

db.on('DELETE', (request, response) => {
	console.log('DB.DELETE called');
	
})

http.createServer(function (request, response) {
	if(url.parse(request.url).pathname === '/api/db') {
		// генерация события, имя события - строка request.method
        db.emit(request.method, request, response);
  	}
}).listen(5000);

console.log('Server running at http://localhost:5000/api/db');