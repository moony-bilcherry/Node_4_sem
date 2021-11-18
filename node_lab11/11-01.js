const ws = require('ws');
const fs = require("fs");

let wsServer = new ws.Server({ port: 4000, host:'localhost', path:'/' })
let k = 0;
wsServer.on('connection', (socket) => {
    const duplex = ws.createWebSocketStream(socket, { encoding: 'utf8' });
    let wfile = fs.createWriteStream(`./upload/ex1_uploaded${++k}.txt`);
    duplex.pipe(wfile);
});
wsServer.on('error', (e) => { console.log('ws server error', e); });
console.log(`WS server: host: ${wsServer.options.host}, post: ${wsServer.options.port}, path: ${wsServer.options.path}`);