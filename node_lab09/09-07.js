const http = require('http');
const fs = require('fs');

let bound = 'woofwoofwoof';
let body = `--${bound}\r\n`;
    body += 'Content-Disposition: form-data; name="file"; filename="MyFile.png"\r\n';
    body += 'Content-Type: application/octet-stream\r\n\r\n';

let options = {
    host: 'localhost',
    path: '/09067',
    port: 5000,
    method: 'POST',
    headers: {
        'Content-Type': `multipart/form-data; boundary=${bound}`
    }
}

const req = http.request(options, (res) => {
    console.log(`res.response (statusCode) = ${res.statusCode}`);

    let data = "";
    res.on("data", (chunk) => { data += chunk; });
    res.on("end", () => {
        console.log(`http.request: res.end: length of body = ${Buffer.byteLength(data)}`);
    });
});

req.on('error', (e) => {
    console.log(`http.request: error: ${e.message}`);
});

req.write(body);
let stream = new fs.ReadStream('MyFile.png');
stream.on('data', (chunk) => {
    req.write(chunk);
    console.log(Buffer.byteLength(chunk));
})
stream.on('end', () => {
    req.end(`\r\n--${bound}--\r\n`);
})