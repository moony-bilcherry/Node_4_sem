const net = require('net');

let HOST = '0.0.0.0';
let PORT1 = 40000;
let PORT2 = 50000;

let start = (port) => {
    return (sock) => {
        console.log(`\tCONNECTED: ${sock.remoteAddress}: ${sock.remotePort}`);
        
        sock.on('data', (data) => {
            console.log(`DATA ${port}: ${sock.remoteAddress}`, data, ' = ', data.readInt32LE());
            sock.write(`ECHO ${port}: ` + data.readInt32LE());
        });
        
        sock.on('close', (data) => {
            console.log(`CLOSED ${port}: ${sock.remoteAddress}: ${sock.remotePort}`)
        })
    }
}

net.createServer(start(PORT1)).listen(PORT1, HOST)
    .on('listening', () => {
        console.log(`TCP server ${HOST}: ${PORT1}`);
    });

net.createServer(start(PORT2)).listen(PORT2, HOST)
    .on('listening', () => {
        console.log(`TCP server ${HOST}: ${PORT2}`);
    });