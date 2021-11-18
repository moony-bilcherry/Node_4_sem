const fs = require('fs');
const ws = require('ws');
const wsClient = new ws('ws://localhost:4000/');

wsClient.on('open', () => {
    const duplex = ws.createWebSocketStream(wsClient, { encoding: 'utf8' });
    let rfile = fs.createReadStream('./ex1.txt');
    rfile.pipe(duplex);
});