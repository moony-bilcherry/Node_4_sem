const http = require('http');
const fs = require('fs');

const fileName = 'received.png';
const file = fs.createWriteStream(fileName);

let options = {
    host: 'localhost',
    path: `/0908/7.png`,
    port: 5000,
    method: 'GET'
}

const req = http.request(options, (res) => {
    console.log(`res.response (statusCode) = ${res.statusCode}`);
    res.pipe(file);
    res.on("end", () => {
        console.log(`http.request: end: file '${fileName}' was delivered to ./node_lab09`);
    });
});

req.on('error', (e) => {
    console.log(`http.request: error: ${e.message}`);
});
req.end();