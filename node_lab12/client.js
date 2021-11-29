const websocket = require('ws');
const ws = new websocket('ws://localhost:4000/broadcast');

ws.onopen = () => {
    console.log('socket.onopen() ');
    ws.on('message', (message) => {
        console.log('Message received -> ', message.toString());
    });
}
ws.onclose = (e) => { console.log('socket.onclose() '); }
ws.onerror = function(err) { console.log('ERROR: ' + err.message);}