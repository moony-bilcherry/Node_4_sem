const http = require('http');
const query = require('querystring');

let params = query.stringify({ x: 9, y: 2 });
console.log(`parameters: ${params}`);

let options = {
    host: 'localhost',
    path: `/0902?${params}`,
    port: 5000,
    method: 'GET'
}

const req = http.request(options, (res) => {
    console.log(`res.response (statusCode) = ${res.statusCode}`);
    
    let data = "";
    res.on("data", (chunk) => {
        data += chunk;
    });
    res.on("end", () => {
        console.log(`http.request: end: body = ${data}`);
    });
});

req.on('error', (e) => {
    console.log(`http.request: error: ${e.message}`);
});
req.end();