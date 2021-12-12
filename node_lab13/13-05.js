const net = require('net');

let HOST = '0.0.0.0';
let PORT = 4000;

let label = (pfx, port, sock) => {
    return `${pfx} ${sock.remoteAddress}: ${sock.remotePort} -> `;
}
let connections = new Map();    // данные о соединениях

let server = net.createServer();
server.on('connection', (sock) => {
    console.log(`\tNew client connected: ${sock.remoteAddress}: ${sock.remotePort}`);
    
    // идентифицируем соединение
    sock.id = (new Date()).toISOString();
    connections.set(sock.id, 0);

    console.log('SOCK.ID = ', sock.id);

    server.getConnections((e, c) => {
        if(!e) {
            console.log(label('CONNECTED', PORT, sock) + c);
            for(let [key, value] of connections) {
                console.log(key, value);
            }
        }
    });

    sock.on('data', (data) => {
        console.log(label('DATA', PORT, sock) + data.readInt32LE());

        // полученное число складывается с имеющейся суммой для этого соединения в connections
        connections.set(sock.id, connections.get(sock.id) + data.readInt32LE());
        console.log(`* SUM = ${connections.get(sock.id)}`);
    })

    let buf = Buffer.alloc(4);
    let writer = setInterval(() => {
        buf.writeInt32LE(connections.get(sock.id), 0);
        sock.write(buf);
    }, 5000);

    sock.on('close', data => {
        console.log(label('CLOSED', PORT, sock) + sock.id);
        clearInterval(writer);
        connections.delete(sock.id);
    });

    sock.on('error', (e) => {
        console.log(label('ERROR', PORT, sock) + ' ' + e);
        clearInterval(writer);
        connections.delete(sock.id);
    });
});

server.on('listening', () => {
    console.log(`TCP server ${HOST}: ${PORT}`);
});
server.on('error', (e) => {
    console.log(`TCP server error: ${e}`);
});
server.listen(PORT, HOST);