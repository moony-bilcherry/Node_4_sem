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
        case path == '/': {
            try {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.end(fs.readFileSync(indexPath));
            }
            catch (e) {
                errorHandler(res, 1, `Unable to read the file (${indexPath})`);
            }
            break;
        }

        case path == '/api/faculties': {
            DB.getFaculties().then(records => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(records.recordset))
            }).catch(error => { errorHandler(res, 2, error); });
            break;
        }
        
        case path == '/api/pulpits': {
            DB.getPulpits().then(records => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(records.recordset))
            }).catch(error => { errorHandler(res, 3, error); });
            break;
        }
        
        case path == '/api/subjects': {
            DB.getSubjects().then(records => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(records.recordset))
            }).catch(error => { errorHandler(res, 4, error); });
            break;
        }
        
        case path == '/api/auditoriumtypes': {
            DB.getAuditoriumTypes().then(records => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(records.recordset))
            }).catch(error => { errorHandler(res, 5, error); });
            break;
        }

        case path == '/api/auditoriums': {
            DB.getAuditoriums().then(records => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(records.recordset))
            }).catch(error => { errorHandler(res, 6, error); });
            break;
        }

        default: {
            methodNotRecognized(res);
            break;
        }
    }
}