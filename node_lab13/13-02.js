const net = require('net');

let HOST = '127.0.0.1';
let PORT = 4000;
let message = typeof process.argv[2] == 'undefined' ? 'default message' : process.argv[2];

let client = new net.Socket();
client.connect(PORT, HOST, () => {
    console.log(`\tClient connected to a server: ${client.remoteAddress}: ${client.remotePort}`);
});

client.write(message);

client.on('data', data => {
    console.log(`Client received data from server: ${data.toString()}`);
    client.destroy();
});

client.on('close', () => {
    console.log('Client closed');
});

client.on('error', (e) => {
    console.log('Client error: ', e);
});