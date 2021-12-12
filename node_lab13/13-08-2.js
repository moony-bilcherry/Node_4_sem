const net = require('net');

let HOST = '127.0.0.1';
let PORT = 50000;

let client = new net.Socket();

let prfx = typeof process.argv[2] == 'undefined' ? 1 : process.argv[2];
let buffer = new Buffer.alloc(4);

client.connect(PORT, HOST, () => {
    console.log(`Client connected: ${client.remoteAddress}:${client.remotePort}`);

    setInterval(() => {
        client.write((buffer.writeInt32LE(prfx, 0), buffer));
    }, 1000);
});

client.on('data', data => {
    console.log(`Client data: ${data}`);
});

client.on('close', () => {
    console.log('Client closed');
});

client.on('error', (e) => {
    console.log('Client error: ', e);
});