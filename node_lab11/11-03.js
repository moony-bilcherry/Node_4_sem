const ws = require('ws');

let k = 0;
let wsServer = new ws.Server({ port: 4000, host:'localhost', path:'/' })
wsServer.on('connection', (socket) => {
    setInterval(() => {
        ++k;
        wsServer.clients.forEach((client) => {
            if(client.readyState === ws.OPEN) 
                client.send(`11-03-server: ${k}`);
        });
    }, 15000);
    
    setInterval(() => { 
        console.log(`SERVER PING: ${wsServer.clients.size} clients`);
        socket.ping(`SERVER PING: ${wsServer.clients.size} clients`);
    }, 5000);

    socket.on('pong', (data)=>{
        console.log(`SERVER.on('pong'): ${data.toString()}`);
    });
});
wsServer.on('error', (e) => { console.log('ws server error', e); });
console.log(`WS server: host: ${wsServer.options.host}, post: ${wsServer.options.port}, path: ${wsServer.options.path}`);