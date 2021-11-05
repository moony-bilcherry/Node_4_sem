const http = require('http');
const url = require('url');
const fs = require("fs");
const qs = require("querystring");

// 01 - GET	/connection?set=set 
// 02 - GET	/headers
// 03 - GET	/parameter?x=x&&y=y
// 04 - GET	/parameter/x/y
// 05 - GET	/close
// 06 - GET	/socket
// 07 - GET	/req-data
// 08 - GET	/resp-status?code=c?mess=m
// 09 - POST	/formparameter
// 10 - POST	/json
// 11 - POST	/xml
// 12 - GET	/files
// 13 - GET	/files/filename
// GET/POST	/upload

let http_handler = (req, res) => {
    if(req.method === 'GET' && url.parse(req.url).pathname === '/connection') {
        if(!url.parse(req.url, true).query.set) {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(`<h2>KeepAliveTimeout = ${server.keepAliveTimeout}</h2>`);
        } else {
            server.keepAliveTimeout = +url.parse(req.url, true).query.set;
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(`<h2>KeepAliveTimeout was updated, new value = ${server.keepAliveTimeout}</h2>`);
        }
    }

    if(req.method === 'GET' && url.parse(req.url).pathname === '/headers') {
        let result = "<h2>\tREQUEST HEADERS: </h2><br/>";
        for (key in req.headers) {
            result += `* ${key} : ${req.headers[key]}<br/>`;
        }
        result += "<h2>\tRESPONSE HEADERS: </h2><br/>";
        res.setHeader("Content-Type", "text/html");
        const resHeaders = res.getHeaders();
        for (key in resHeaders) {
            result += `* ${key} : ${resHeaders[key]}<br/>`;
        }
        res.writeHead(200);
        res.end(result);
    }

    if(req.method === 'GET' && url.parse(req.url).pathname === '/parameter') {
        if((x = +url.parse(req.url, true).query.x) && (y = +url.parse(req.url, true).query.y)) {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(`<h2>success! results:</h2><p>${x} + ${y} = ${x + y}</p><p>${x} - ${y} = ${x - y}</p><p>${x} * ${y} = ${x * y}</p><p>${x} / ${y} = ${x / y}</p>`);
        } else {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(`<h2>ERROR (parameters not provided): ${url.parse(req.url).pathname}</h2>`);
        }
    }

    if(req.method === 'GET' && RegExp(/^\/parameter\/[a-zA-Z1-9]+\/[a-zA-Z1-9]+/).test(url.parse(req.url).pathname)) {
        console.log('regex checked');
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        let p = url.parse(req.url,true);
		let x=+p.pathname.split('/')[2];
		let y=+p.pathname.split('/')[3];
        if(!Number.isInteger(x) || !Number.isInteger(y)) {
            res.end(`ERROR: x (${p.pathname.split('/')[2]}) and y (${p.pathname.split('/')[3]}) are not integer:` + p.pathname);
        }
        else res.end(`<h2>success! results:</h2><p>${x} + ${y} = ${x + y}</p><p>${x} - ${y} = ${x - y}</p><p>${x} * ${y} = ${x * y}</p><p>${x} / ${y} = ${x / y}</p>`);
    }


}

let server = http.createServer();
server.keepAliveTimeout = 10000;

server.listen(5000, () => {
    console.log('Server running at http://localhost:5000/');
}).on('error', (e) => {
    console.log('Server running at http://localhost:5000/ : ERROR = ', e.code);
}).on('request', http_handler);