const rpcWSS = require('rpc-websockets').Server;
let server = new rpcWSS({ port: 4000, host:'localhost' });

server.event('A');
server.event('B');
server.event('C');

process.stdin.setEncoding('utf-8');
process.stdin.on('readable',()=>{
    let data = null;
    while ((data = process.stdin.read()) != null){
        if (data.trim() == 'A') server.emit('A');
        if (data.trim() == 'B') server.emit('B');
        if (data.trim() == 'C') server.emit('C');
    }
});