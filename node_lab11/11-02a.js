const fs = require('fs');
const ws = require('ws');
const wsClient = new ws('ws://localhost:4000/');

let k = 0;
wsClient.on('open', () => {
    const duplex = ws.createWebSocketStream(wsClient, { encoding: 'utf8' });
    let wfile = fs.createWriteStream(`./ex2_downloaded${++k}.txt`);
    duplex.pipe(wfile);
});