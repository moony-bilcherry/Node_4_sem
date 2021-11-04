const http = require("http");
let stat = require('./m0701')('./static');

let http_handler = (request, response) => {
    if(request.method === 'GET') {
        if(stat.isStatic('html', request.url))
            stat.sendFile(request, response, {'Content-Type':'text/html; charset=utf-8'});
        else if(stat.isStatic('css', request.url))
            stat.sendFile(request, response, {'Content-Type':'text/css; charset=utf-8'});
        else if(stat.isStatic('js', request.url))
            stat.sendFile(request, response, {'Content-Type':'text/javascript; charset=utf-8'});
        else if(stat.isStatic('png', request.url))
            stat.sendFile(request, response, {'Content-Type':'image/png; charset=utf-8'});
        else if(stat.isStatic('docx', request.url))
            stat.sendFile(request, response, {'Content-Type':'application/msword; charset=utf-8'});
        else if(stat.isStatic('json', request.url))
            stat.sendFile(request, response, {'Content-Type':'application/json; charset=utf-8'});
        else if(stat.isStatic('xml', request.url))
            stat.sendFile(request, response, {'Content-Type':'application/xml; charset=utf-8'});
        else if(stat.isStatic('mp4', request.url))
            stat.sendFile(request, response, {'Content-Type':'video/mp4; charset=utf-8'});
        else stat.writeHTTP404(response);
    }
    else {
        response.statusCode = 405;
        response.statusMessage = 'Invalid method';
        response.end("HTTP ERROR 405: Invalid method");
    }
}

let server = http.createServer();
server.listen(5000, () => {
    console.log('Server running at http://localhost:5000/');
}).on('error', (e) => {
    console.log('Server running at http://localhost:5000/ : ERROR = ', e.code);
}).on('request', http_handler);