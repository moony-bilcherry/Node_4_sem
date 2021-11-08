const http = require('http');
const url = require('url');

let http_handler = (req, res) => {
    if(req.method === 'GET' && url.parse(req.url).pathname === '/0901') {
        console.log('server received GET request on /0901')
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(`<h2>hello gamers</h2>`);
    }
}

let server = http.createServer();

server.listen(5000, () => {
    console.log('Server running at http://localhost:5000/');
}).on('error', (e) => {
    console.log('Server running at http://localhost:5000/ : ERROR = ', e.code);
}).on('request', http_handler);