const url = require('url');
const http = require('http');
const fs = require('fs');

const Db = require('./db')
let DB = new Db();

const indexPath = './resource/index.html'

function methodNotRecognized(res) {
    errorHandler(res, 0, `Method not recognised :[`);
}

function errorHandler(res, code, mess) {
    res.writeHead(500, 'yikes', { 'Content-Type': 'application/json; charset=utf-8'});
    res.end(`{"error": "${code}", "message": "${mess}"}`)
}

module.exports = (req, res) => {
    let path = url.parse(req.url).pathname;

    switch(true) {
        case path == '/api/faculties': {
            res.writeHead(200, {'Content-Type': 'application/json'});
            DB.GetRecordsByTableName('faculty')
                .then(records => res.end(JSON.stringify(records)))
                .catch(error => { errorHandler(res, 1, error); });
            break;
        }
        
        case path == '/api/pulpits': {
            res.writeHead(200, {'Content-Type': 'application/json'});
            DB.GetRecordsByTableName('pulpit')
                .then(records => res.end(JSON.stringify(records)))
                .catch(error => { errorHandler(res, 2, error); });
            break;
        }
        
        default: {
            methodNotRecognized(res);
            break;
        }
    }
}