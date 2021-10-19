const http = require('http');
let state = 'norm';

http.createServer(function(request, response) {
	response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
	response.end('<h1 style="color: #011627; font-family: \'Lucida Sans\'">' + state + '</h1>');
}).listen(5000);

process.stdin.setEncoding('utf8');
process.stdout.write(state + ' >> ');

process.stdin.on('readable', () => {
    let chunk = null;

    while ((chunk = process.stdin.read()) != null) {
        switch(chunk.trim()) {
            case 'exit': process.exit(0);
            case 'norm':
            case 'stop':
            case 'test':
            case 'idle': {
                process.stdout.write('MODE = ' + state + ' --> ' + chunk.trim() +'\n');
                state = chunk.trim();
                process.stdout.write(state + ' >> ');
                break;
            }
            default: {
                process.stderr.write(state + ' >> ');
                break;
            }
        }
    }
});