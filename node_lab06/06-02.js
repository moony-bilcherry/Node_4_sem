const http = require('http');
const fs = require('fs');
const url = require('url');
const { parse } = require('querystring');

const nodemailer = require('nodemailer');

let server = http.createServer(function (request, response) {
	if (url.parse(request.url).pathname === '/' && request.method === 'GET') {
        response.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
        response.end(fs.readFileSync('./06-02.html'))
    }
	else if (url.parse(request.url).pathname === '/' && request.method === 'POST') {
        let body = '';
        request.on('data', chunk => { body += chunk.toString(); });
        request.on('end', () => {
            let parm = parse(body);

            // чтобы можно было отправить с гугловской почты: включить функцию по ссылке
            // https://myaccount.google.com/lesssecureapps
            
            const transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: parm.sender,
                    pass: parm.password,
                },
            });
            
            const options = {
                from: parm.sender,
                to: parm.receiver,
                subject: parm.subject,
                text: parm.message,
            }

            transporter.sendMail(options, (err, info) => {
                if(err) {
                    console.log(err);
                    return;
                }
                console.log("Sent: " + info.response);
            })

            response.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
            response.end(`<h1>Sent from ${parm.sender} to ${parm.receiver}: ${parm.message}</h1>`);
        })
    }
    else response.end('<h1>something is wrong</h1>');
}).listen(5000);

console.log('Server running at http://localhost:5000/');