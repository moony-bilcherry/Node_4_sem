const rpcWSC = require('rpc-websockets').Client;
let ws = new rpcWSC('ws://localhost:4000/');

process.stdin.setEncoding('utf-8');
process.stdin.on('readable',()=>{
    let data = null;
    while ((data = process.stdin.read()) != null){
        if (data.trim() == 'A') ws.notify('A');
        if (data.trim() == 'B') ws.notify('B');
        if (data.trim() == 'C') ws.notify('C');
    }
});