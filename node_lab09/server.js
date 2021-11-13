const http = require('http');
const fs = require("fs");
const url = require('url');
const querystring = require("querystring");
const parseString = require('xml2js').parseString;
const xmlBuilder = require('xmlbuilder');
const mp = require("multiparty");

let http_handler = (req, res) => {
    if(req.method === 'GET' && url.parse(req.url).pathname === '/0901') {
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end('task 09-01 response');
    }

    if(req.method === 'GET' && url.parse(req.url).pathname === '/0902') {
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end(`x: ${url.parse(req.url, true).query.x}, y: ${url.parse(req.url, true).query.y}`);
    }

    if(req.method === 'POST' && url.parse(req.url).pathname === '/0903') {
        let body = "";
        req.on("data", (data) => {
            body += data;
        });

        req.on("end", () => {
            let result = `x: ${querystring.parse(body).x}, y: ${querystring.parse(body).y}, s: ${querystring.parse(body).s}`;
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(result);
        });
    }

    if(req.method === 'POST' && url.parse(req.url).pathname === '/0904') {
        let data = '';
        req.on('data', chunk => { data += chunk.toString(); });
        req.on('end', () => {
            res.writeHead(200, {'Content-Type' : 'application/json; charset=utf-8'});
            data = JSON.parse(data);
            let result = {};
            result.__comment = "response: lab 08-10";
            result.x_plus_y = data.x + data.y;
            result.concat_s_and_o = `${data.s}: ${data.o.name} ${data.o.surname}`;
            result.length_m = data.m.length;
            res.end(JSON.stringify(result));
        })
    }

    if(req.method === 'POST' && url.parse(req.url).pathname === '/0905') {
        let xmlString = '';
        req.on('data', data => { xmlString += data.toString(); });
        req.on('end', () => {
            parseString(xmlString, (err, result) => {
                if (err) {
                    console.log("xml parse error");
                    res.writeHead(400, { "Content-Type": "text/xml; charset=utf-8" });
                    res.end("<result>parse error</result>");
                    return;
                }
                let sum = 0;
                let mess = "";
                result.request.x.forEach(el => { sum += Number.parseInt(el.$.value); })
                result.request.m.forEach(el => { mess += el.$.value; })

                let xmlDoc = xmlBuilder.create('response')
                    .att("id", Math.round(Math.random() * 100))
                    .att("request", result.request.$.id);
                xmlDoc.ele('sum', { element: "x", sum: `${sum}`});
                xmlDoc.ele('concat', { element: "m", result: `${mess}`});

                rc = xmlDoc.toString({pretty: true});
                res.writeHead(400, { "Content-Type": "text/xml; charset=utf-8" });
                res.end(xmlDoc.toString({ pretty: true }));
            });
        })
    }

    if(req.method === 'POST' && url.parse(req.url).pathname === '/09067') {
        let result = '';
		let form = new mp.Form({ uploadDir:'./static' });
        form.parse(req);
		form.on('field',(name, field)=>{
			console.log('---- got a field:');
			console.log(name, field);
			result += `<br/>${name} = ${field}`;
		});
		form.on('file', (name, file)=>{
			console.log('---- got a file:');
			console.log(name, file);
			result += `<br/>${name} = original name: ${file.originalFilename}; path: ${file.path}`;
		});
        form.on("error", (err) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end("<h2>form error</h2>");
        });
        form.on("close", () => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write("<h2>success! form data:</h2>");
            res.end(result);
        });
    }

    if(req.method === 'GET' && RegExp(/^\/0908\/[a-zA-Z1-9]+/).test(url.parse(req.url).pathname)) {
        try {
            res.end(fs.readFileSync('static/' + url.parse(req.url, true).pathname.split('/')[2]));
        } catch (err) {
            res.writeHead(404, {'Content-type': 'text/html'});
            res.end('404 ' + err.toString());
        }
    }
}

let server = http.createServer();

server.listen(5000, () => {
    console.log('Server running at http://localhost:5000/');
}).on('error', (e) => {
    console.log('Server running at http://localhost:5000/ : ERROR = ', e.code);
}).on('request', http_handler);