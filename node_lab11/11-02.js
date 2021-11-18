const ws = require('ws');
const fs = require("fs");

let wsServer = new ws.Server({ port: 4000, host:'localhost', path:'/' })
wsServer.on('connection', (socket) => {
    const duplex = ws.createWebSocketStream(socket, { encoding: 'utf8' });
    let rfile = fs.createReadStream(`./download/ex2.txt`);
    rfile.pipe(duplex);
});
wsServer.on('error', (e) => { console.log('ws server error', e); });
console.log(`WS server: host: ${wsServer.options.host}, post: ${wsServer.options.port}, path: ${wsServer.options.path}`);