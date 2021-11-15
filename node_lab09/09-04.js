const http = require('http');

let jsonParm = JSON.stringify(
    {
        "__comment": "request: lab 09-04",
        "x": 9,
        "y": 4,
        "s": "some message",
        "m": ["a", "b", "c", "d", "e", "f"],
        "o": {"surname": "Wick", "name": "John"}
    }
);

let options = {
    host: 'localhost',
    path: '/0904',
    port: 5000,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}

const req = http.request(options, (res) => {
    console.log(`res.response (statusCode) = ${res.statusCode}`);
    
    let data = "";
    res.on("data", (chunk) => {
        data += chunk.toString('utf8');
    });
    res.on("end", () => {
        console.log(`http.request: end: body = ${data}`);
        console.log(`http.request: end: parse(body) = ${JSON.parse(data)}`);
    });
});

req.on('error', (e) => {
    console.log(`http.request: error: ${e.message}`);
});
req.end(jsonParm);