const ws = require('ws');

let k = 0;
let wsServer = new ws.Server({ port: 5000, host:'localhost', path:'/' })
wsServer.on('connection', (ws) => {
    ws.on('message', (m) => {
        wsServer.clients.forEach((client) => {
            if(client.readyState === ws.OPEN) 
                client.send('server: ' + m);
        });
    });
});
wsServer.on('error', (e) => { console.log('ws server error', e); });
console.log(`WS server: host: ${wsServer.options.host}, post: ${wsServer.options.port}, path: ${wsServer.options.path}`);