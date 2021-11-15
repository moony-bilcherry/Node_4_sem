const http = require('http');
const ws = require('ws');
const fs = require("fs");
const url = require('url');

let httpServer = http.createServer((req, res) => {
    if(req.method === 'GET' && url.parse(req.url).pathname === '/start') {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(fs.readFileSync('./10-01.html'));
    }
    else {
        res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h2>response code 400</h2>');
    }
});

httpServer.listen(3000, () => {
    console.log('HTTP server running at http://localhost:3000/');
});

let k = 0;
let wsServer = new ws.Server({ port: 4000, host:'localhost', path:'/' })
wsServer.on('connection', (ws) => {
    let n = 0;
    setInterval(() => {
        ++k;
        ws.send(`10-01 Server: ${n}->${k}`);
    }, 5000);
    ws.on('message', (m) => {
        console.log(`received message => ${m}`);
        n = Number.parseInt(m.toString().split(":")[1]);
        console.log("n:", n);
    });
    setInterval(() => { ws.send(`server: ${++k}`)}, 1500);
})
wsServer.on('error', (e) => { console.log('ws server error', e); });
console.log(`WS server: host: ${wsServer.options.host}, post: ${wsServer.options.port}, path: ${wsServer.options.path}`);