const rpcWSS = require('rpc-websockets').Server;
let server = new rpcWSS({ port: 4000, host:'localhost' });

server.setAuth((l) => l.login === 'user' && l.password === '1111');

server.register('square', (params) => {
    return params.length === 2 ? params[0] * params[1] : Math.PI * (params[0] ** 2);
}).public();

server.register('sum', (params) => {
    let sum = 0;
    params.forEach((elem) => {
        if(Number.isInteger(elem)) sum += elem;
    });
    return sum;
}).public();

server.register('mul', (params) => {
    let mul = 1;
    params.forEach((elem) => {
        if(Number.isInteger(elem)) mul *= elem;
    });
    return mul;
}).public();

function fibonacci(n) {
    if (n <= 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

server.register('fib', (params) => {
    if (params.length !== 1 ) return [1];
    return fibonacci(params);
}).protected();

function factorial(n) {
    return (n == 1 || n == 0) ? 1 : n * factorial(n - 1);
}

server.register('fact', (params) => {
    if (params.length !== 1 ) return [1];
    return factorial(params);
}).protected();