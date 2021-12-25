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
    let path = decodeURI(url.parse(req.url).pathname);
    pathParameters = path.split('/');

    switch('/api/' + pathParameters[2]) {
        case '/api/faculties': {
            res.writeHead(200, {'Content-Type': 'application/json'});
            DB.DeleteFaculty(pathParameters[3])
                .then(records => res.end(JSON.stringify(records)))
                .catch(error => { errorHandler(res, 7, error); });        
            break;
        }
        
        case '/api/pulpits': {
            res.writeHead(200, {'Content-Type': 'application/json'});
            DB.DeletePulpit(pathParameters[3])
                .then(records => res.end(JSON.stringify(records)))
                .catch(error => { errorHandler(res, 9, error); });        
            break;
        }

        default: {
            methodNotRecognized(res);
            break;
        }
    }
}