const url = require('url');
const http = require('http');
const fs = require('fs');

const Db = require('./db')
let DB = new Db();

function methodNotRecognized(res) {
    errorHandler(res, 0, `Method not recognised :[`);
}

function errorHandler(res, code, mess) {
    res.writeHead(500, 'yikes', { 'Content-Type': 'application/json; charset=utf-8'});
    res.end(`{"error": "${code}", "message": "${mess}"}`)
}

module.exports = (req, res) => {
    let path = url.parse(req.url).pathname;
    let jsonData = '';

    switch(true) {
        case path == '/api/faculties': {
            req.on('data', chunk => {
                jsonData += chunk;
            });
            req.on('end', () => {
                jsonData = JSON.parse(jsonData);
                res.writeHead(200, {'Content-Type': 'application/json'});
                DB.InsertFaculty(jsonData)
                    .then(records => res.end(JSON.stringify(records)))
                    .catch(error => { errorHandler(res, 3, error); });
            });
            break;
        }
        
        case path == '/api/pulpits': {
            req.on('data', chunk => {
                jsonData += chunk;
            });
            req.on('end', () => {
                jsonData = JSON.parse(jsonData);
                res.writeHead(200, {'Content-Type': 'application/json'});
                DB.InsertPulpit(jsonData)
                    .then(records => res.end(JSON.stringify(records)))
                    .catch(error => { errorHandler(res, 4, error); });
            });
            break;
        }

        default: {
            methodNotRecognized(res);
            break;
        }
    }
}