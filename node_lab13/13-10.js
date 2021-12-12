const udp = require('dgram');
const PORT = 3000;

let client = udp.createSocket('udp4');

let message = typeof process.argv[2] == 'undefined' ? 'default message' : process.argv[2];

client.on('message', (msg, info) => {
    console.log(`Received from ${info.address}:${info.port} -> ${msg.toString()}`);
});

client.send(message, PORT, 'localhost', (err) => {
    if (err) client.close();
    else console.log('SENT');
});

client.on('error', (err) => {
    console.log('Error: ' + err);
    client.close();
});

client.on('close', () => {
    console.log('Closed');
});