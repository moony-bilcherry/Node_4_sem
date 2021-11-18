const ws = require('ws');
const wsClient = new ws('ws://localhost:4000/');

let k = 0;

wsClient.on('message', (mess) => {
    console.log(mess.toString());
});

wsClient.on('pong', (data)=>{
    console.log(`CLIENT.on('pong'): ${data.toString()}`);
});

setInterval(() => {
    console.log('CLIENT PING');
    wsClient.ping('CLIENT PING');
}, 5000);
