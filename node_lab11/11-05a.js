const rpcWSC = require('rpc-websockets').Client;
let ws = new rpcWSC('ws://localhost:4000/');

ws.on('open', () => {
    ws.call('square', [3]).then((r) => { console.log(`square[3] = ${r}`)});
    ws.call('square', [5,4]).then((r) => { console.log(`square[5,4] = ${r}`)});
    ws.call('sum', [2]).then((r) => { console.log(`sum[2] = ${r}`)});
    ws.call('sum', [2,4,6,8,10]).then((r) => { console.log(`sum[2,4,6,8,10] = ${r}`)});
    ws.call('mul', [3]).then((r) => { console.log(`mul[3] = ${r}`)});
    ws.call('mul', [3,5,7,9,11,13]).then((r) => { console.log(`mul[3,5,7,9,11,13] = ${r}`)});

    ws.login({ login: 'user', password: '1111'}).then((login) => {
        if(login) {
            ws.call('fib', [1]).catch((e)=>{console.log('catch fib: ',e)}).then((r) => { console.log(`fib[1] = ${r}`)});
            ws.call('fib', [2]).catch((e)=>{console.log('catch fib: ',e)}).then((r) => { console.log(`fib[2] = ${r}`)});
            ws.call('fib', [7]).catch((e)=>{console.log('catch fib: ',e)}).then((r) => { console.log(`fib[7] = ${r}`)});
            ws.call('fact', [0]).catch((e)=>{console.log('catch fact: ',e)}).then((r) => { console.log(`fact[0] = ${r}`)});
            ws.call('fact', [5]).catch((e)=>{console.log('catch fact: ',e)}).then((r) => { console.log(`fact[5] = ${r}`)});
            ws.call('fact', [10]).catch((e)=>{console.log('catch fact: ',e)}).then((r) => { console.log(`fact[10] = ${r}`)});
        }
        else console.log('login error');
    })
});