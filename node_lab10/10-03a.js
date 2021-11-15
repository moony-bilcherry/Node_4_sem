const WebSocket = require('ws');

let parm0 = process.argv[0];
let parm1 = process.argv[1];
let parm2 = process.argv[2];

console.log(`parm2 = ${parm2}`);

let prfx = typeof parm2 == 'undefined' ? 'A' : parm2;
let socket = new WebSocket('ws://localhost:5000/');
let handler;

socket.onopen = () => {
    console.log('socket.onopen() ');
    let k = 0;

    handler = setInterval(() => { 
        socket.send(`client: ${prfx}-${++k}`); 
    }, 3000);

    socket.onmessage = (e) => { 
        console.log('socket.onmessage(): ', e.data); 
    }

    setTimeout(() => {
        clearInterval(handler);
        socket.close();
    }, 25000);
}
socket.onclose = (e) => { console.log('socket.onclose() '); }
socket.onerror = function(err) { console.log('ERROR: ' + err.message);}