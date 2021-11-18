const ws = require('ws');

let k = 0;
let wsServer = new ws.Server({ port: 4000, host:'localhost', path:'/' })
wsServer.on('connection', (socket) => {
    socket.on('message', (mess) => {
        console.log(`server.on('message'): ${mess}`);
        socket.send(JSON.stringify({ server: ++k, client: JSON.parse(mess).client, date: new Date().toISOString() }))
    });
});
wsServer.on('error', (e) => { console.log('ws server error', e); });
console.log(`WS server: host: ${wsServer.options.host}, post: ${wsServer.options.port}, path: ${wsServer.options.path}`);