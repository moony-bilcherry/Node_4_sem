const net = require('net');

let HOST = '0.0.0.0';
let PORT = 4000;

let sum = 0;

let server = net.createServer();
server.on('connection', (sock) => {
    console.log(`\tNew client connected: ${sock.remoteAddress}: ${sock.remotePort}`);

    sock.on('data', (data) => {
        sum += data.readInt32LE();
        console.log(`Server received data from client: `, data, `sum = ${sum}`);
    })

    let buf = Buffer.alloc(4);
    setInterval(() => {
        buf.writeInt32LE(sum, 0);
        sock.write(buf);
    }, 5000);

    sock.on('close', data => {
        console.log("Client connection closed");
    });

    sock.on('error', (e) => {
        console.log(`Server error: ${e}`);
    });
});

server.on('listening', () => {
    console.log(`TCP server ${HOST}: ${PORT}`);
});
server.on('error', (e) => {
    console.log(`TCP server error: ${e}`);
});
server.listen(PORT, HOST);