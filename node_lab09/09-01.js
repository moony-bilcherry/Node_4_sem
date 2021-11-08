const http = require('http');
let options = {
    host: 'localhost',
    path: '/0901',
    port: 5000,
    method: 'GET'
}
const req = http.request(options, (res) => {
    console.log(`req.method = ${req.method}`);
    console.log(`res.response (statusCode) = ${res.statusCode}`);
    console.log(`res.statusMessage = ${res.statusMessage}`);
    console.log(`res.socket.remoteAddress = ${res.socket.remoteAddress}`);
    console.log(`res.socket.remotePort = ${res.socket.remotePort}`);
    console.log(`res.headers = ${res.headers}`);

    let data = '';
    res.on('data', (chunk) => {
        console.log(`http.request: data: body = ${data += chunk.toString('utf8')}`);
    });
    res.on('end', () => {
        console.log(`http.request: end: body = ${data}`);
    });
});

req.on('error', (e) => {
    console.log(`http.request: error: ${e.message}`);
});
req.end();