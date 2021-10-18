const http = require('http');
const fs = require('fs');

http.createServer(function (request, response) {
    if(request.url === '/xmlhttprequest') {
        fs.readFile('xmlhttprequest.html',(err, data)=>
        {
            if(err) ErrHandler(response);
            response.writeHead(200, {'Content-Type': 'text/html'})
            response.end(data);
        })
    }
    if(request.url === '/api/name') {
        fs.readFile('text.txt',(err, data)=>
        {
            if(err) ErrHandler(response);
            response.writeHead(200, {'Content-Type': 'text/plain'})
            response.end(data);
        })
    }
}).listen(5000);

function ErrHandler(res){
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end('<h1>ERROR</h1>')
}
console.log('Server running at http://localhost:5000/xmlhttprequest');