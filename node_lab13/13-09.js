const udp = require('dgram');
const PORT = 3000;

let server = udp.createSocket('udp4');
server.bind(PORT);

server.on('message', (msg, info) => {
    console.log(`Server received from ${info.address}:${info.port} -> ${msg.toString()}`);
    server.send(`ECHO: ${msg.toString()}`, info.port, info.address, (err) => {
        if (err) server.close();
        else console.log('SENT');
    });
});

server.on('listening', () => {
    console.log(`Server port: ${server.address().port}`);
    console.log(`Server address: ${server.address().address}`);
    console.log(`Server IP family: ${server.address().family}`);
});

server.on('error', (err) => {
    console.log('Error: ' + err);
    server.close();
});

server.on('close', () => {
    console.log('Server closed');
});