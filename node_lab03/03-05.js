const http = require('http');
const fs = require('fs');
const url = require('url');

let fact = (num) => { return num < 2 ? 1 : num * fact(num - 1); }

function Fact(n, cb) {
    this.fn = n;
    this.ffact = fact;
    this.fcb = cb;
    this.calc =() => {setImmediate(() => {this.fcb(null, this.ffact(this.fn));});}
}

http.createServer(function (request, response) {
	if(url.parse(request.url).pathname === '/fact') {
        if (url.parse(request.url, true).query.k !== null) {
            let k = +url.parse(request.url, true).query.k;
            if (Number.isInteger(k)) {
                response.writeHead(200, {'Content-Type' : 'application/json'});
                let fact = new Fact(k, (err, result) => 
                    { response.end(JSON.stringify( { k:k, fact: result })); })
                fact.calc();
            }
        }
        if(url.parse(request.url, true).query.k === undefined) {
            console.log('parametra netu');
            response.end(JSON.stringify({k:0}));
        }
  	}
    
    if (url.parse(request.url).pathname === '/') {
        let html = fs.readFileSync('./03-03.html');
        response.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
        response.end(html)
    }
}).listen(5000);

console.log('Server running at http://localhost:5000/fact');