const http = require('http');
const fs = require('fs');

const getHandler = require('./js/getHandler');
const postHandler = require('./js/postHandler');
const putHandler = require('./js/putHandler');
const deleteHandler = require('./js/deleteHandler');

let http_handler = (req, res) => {
    switch(req.method) {
        case 'GET': getHandler(req, res); break;
        case 'POST': postHandler(req, res); break;
        case 'PUT': putHandler(req, res); break;
        case 'DELETE': deleteHandler(req, res); break;
    }
}

let server = http.createServer();

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
}).on('error', (e) => {
    console.log('Server running at http://localhost:3000/ : ERROR = ', e.code);
}).on('request', http_handler);