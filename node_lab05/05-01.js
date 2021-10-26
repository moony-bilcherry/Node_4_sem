const http = require('http');
const fs = require('fs');
const url = require('url');

let data = require('./db.js');
let db = new data.DB();

let countRequest = 0;
let countCommit = 0;

let timerSd = null;
let timerSc = null;
let timerSs = null;

let startTime = null;
let endTime = null;

process.stdin.unref();

// слушатели событий

db.on('GET', (request, response) => {
	console.log('GET called');
	countRequest++;
	response.end(JSON.stringify(db.select()));
})

db.on('POST', (request, response) => {
	console.log('POST called');
	countRequest++;
	request.on('data', data => {
        let row = JSON.parse(data);
        row.id = db.getIndex();
        response.end(JSON.stringify(db.insert(row)));
    });
})

db.on('PUT', (request, response) => {
	console.log('PUT called');
	countRequest++;
	request.on('data', data => {
        let row = JSON.parse(data);
        response.end(JSON.stringify(db.update(row)));
    });
})

db.on('DELETE', (request, response) => {
	console.log('DELETE called');
	countRequest++;
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

db.on('HEAD', ()=>{
    console.log('COMMIT called');
    countCommit++;
    db.commit();
});

let server = http.createServer(function (request, response) {
	if(url.parse(request.url).pathname === '/api/db') {
		// генерация события, имя события - строка request.method
        db.emit(request.method, request, response);
  	}
	if (request.url === '/') {
        let html = fs.readFileSync('./index.html');
        response.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
        response.end(html)
    }
	if (request.url === '/api/ss') {
        response.writeHead(200, {'Content-Type':'application/json'});
        response.end(JSON.stringify(getStats()));
    }
}).listen(5000);

function getStats() {
	return { start: startTime, end: endTime, requests: countRequest, commits: countCommit };
}

process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
	let command = null;
    while ((command = process.stdin.read()) != null) {
      	if (command.trim().startsWith('sd')) {
          	if(server.listening) {
				let sec = Number(command.trim().replace(/[^\d]/g, ''));
				if(sec) {
					console.log(`Server will close in ${sec} sec`);
					clearTimeout(timerSd);
					timerSd = setTimeout(() =>  { 
						server.close(() => { console.log('SERVER CLOSED'); });
						
					}, sec * 1000);
				}
				if(!sec && command.trim().length > 2) {
					console.error("ERROR: parameter not integer");
				}
				if(command.trim().length === 2) {
					clearTimeout(timerSd);
					console.log('SD canceled');
				}
			}
			else {
				console.error("Server is not listening (closed)");
			}
   		}
  
      	if (command.trim().startsWith('sc')) {
          	let sec = Number(command.trim().replace(/[^\d]/g, ''));
          	if(sec) {
              	clearTimeout(timerSc);
              	timerSc = setInterval( () => { db.emit('HEAD') }, sec * 1000);
              	timerSc.unref();
          	}
          	if(!sec && command.trim().length > 2) {
              	console.error("ERROR: parameter not integer");
          	}
          	if(command.trim().length === 2) {
              	clearTimeout(timerSc);
              	console.log('SC canceled');
          	}
      	}
		
		if (command.trim().startsWith('ss')) {
            let sec = Number(command.trim().replace(/[^\d]/g, ''));
            if(sec) {
                clearTimeout(timerSs);
				startTime = new Date();
                timerSs = setTimeout( () => { 
					endTime = new Date();
					process.stdout.write(JSON.stringify(getStats())); 
				}, sec * 1000);
                timerSs.unref();
            }
            if(!sec && command.trim().length > 2) {
                console.error("ERROR: parameter not integer");
            }
            if(command.trim().length === 2) {
                clearTimeout(timerSs);
                console.log('SS canceled');
            }
      	}
	}
});

console.log('Server running at http://localhost:5000/api/db');