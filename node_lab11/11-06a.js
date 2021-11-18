const rpcWSC = require('rpc-websockets').Client;
let ws = new rpcWSC('ws://localhost:4000/');

ws.on('open', () => {
    ws.subscribe('A');
    ws.on('A', () => {
        console.log('event A called');
    });
});