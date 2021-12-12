const net = require('net');

let HOST = '0.0.0.0';
let PORT = 4000;

net.createServer((sock) => {
    console.log(`\tNew client connected: ${sock.remoteAddress}: ${sock.remotePort}`);

    sock.on('data', (data) => {
        console.log(`Server received data from client: ${data.toString()}`);
        sock.write(`ECHO: ${data}`);
    })

    sock.on('close', data => {
        console.log("Client connection closed");
    });

    sock.on('error', (e) => {
        console.log(`Server error: ${e}`);
    });
}).listen(PORT, HOST);

console.log(`TCP server ${HOST}: ${PORT}`);