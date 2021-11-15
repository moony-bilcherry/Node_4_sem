const WebSocket = require('ws');

let socket = new WebSocket('ws://localhost:4000/');
let handler;
let k = 0;

socket.onopen = () => {
    console.log('socket.onopen() ');
    handler = setInterval(() => { 
        socket.send(`10-01-client: ${++k}`); 
    }, 3000);
}
socket.onclose = (e) => { console.log('socket.onclose() '); }
socket.onmessage = (e) => { console.log('socket.onmessage(): ', e.data); }
socket.onerror = function(err) {
    console.log('ERROR: ' + err.message);
}
setTimeout(() => {
    clearInterval(handler);
    socket.close();
}, 25000);