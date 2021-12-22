const url = require('url');
const http = require('http');
const fs = require('fs');

const Db = require('./db')
let DB = new Db();

function methodNotRecognized(req, res) {
    errorHandler(req, res, 0, `Method not recognised :[`);
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
                console.log("jsonData: " + JSON.stringify(jsonData));
                res.writeHead(200, {'Content-Type': 'application/json'});
                DB.findFaculty(jsonData.FACULTY).then((result) => {
                    if(result.recordset.length == 0) throw 'Faculty not found';
                    res.write(JSON.stringify(result.recordset));
                }).catch(error => { errorHandler(res, 12, error); });
                
                DB.putFaculties(jsonData.FACULTY, jsonData.FACULTY_NAME).then(records => {
                    res.end();
                }).catch(error => { errorHandler(res, 13, error); });
            });
            break;
        }
        
        case path == '/api/pulpits': {
            req.on('data', chunk => {
                jsonData += chunk;
            });
            req.on('end', () => {
                jsonData = JSON.parse(jsonData);
                console.log("jsonData: " + JSON.stringify(jsonData));
                res.writeHead(200, {'Content-Type': 'application/json'});
                DB.findPulpit(jsonData.PULPIT).then((result) => {
                    if(result.recordset.length == 0) throw 'Pulpit not found';
                    res.write(JSON.stringify(result.recordset));
                }).catch(error => { errorHandler(res, 14, error); });

                DB.putPulpits(jsonData.PULPIT, jsonData.PULPIT_NAME, jsonData.FACULTY).then(records => {
                    res.end();
                }).catch(error => { errorHandler(res, 15, error); });
            });
            break;
        }
        
        case path == '/api/subjects': {
            req.on('data', chunk => {
                jsonData += chunk;
            });
            req.on('end', () => {
                jsonData = JSON.parse(jsonData);
                console.log("jsonData: " + JSON.stringify(jsonData));
                res.writeHead(200, {'Content-Type': 'application/json'});
                DB.findSubject(jsonData.SUBJECT).then((result) => {
                    if(result.recordset.length == 0) throw 'Subject not found';
                    res.write(JSON.stringify(result.recordset));
                }).catch(error => { errorHandler(res, 16, error); });

                DB.putSubjects(jsonData.SUBJECT, jsonData.SUBJECT_NAME, jsonData.PULPIT).then(records => {
                    res.end();
                }).catch(error => { errorHandler(res, 17, error); });
            });
            break;
        }
        
        case path == '/api/auditoriumtypes': {
            req.on('data', chunk => {
                jsonData += chunk;
            });
            req.on('end', () => {
                jsonData = JSON.parse(jsonData);
                console.log("jsonData: " + JSON.stringify(jsonData));
                res.writeHead(200, {'Content-Type': 'application/json'});
                DB.findAuditoriumType(jsonData.AUDITORIUM_TYPE).then((result) => {
                    if(result.recordset.length == 0) throw 'Auditorium type not found';
                    res.write(JSON.stringify(result.recordset));
                }).catch(error => { errorHandler(res, 18, error); });
                
                DB.putAuditoriumTypes(jsonData.AUDITORIUM_TYPE, jsonData.AUDITORIUM_TYPENAME).then(records => {
                    res.end();
                }).catch(error => { errorHandler(res, 19, error); });
            });
            break;
        }

        case path == '/api/auditoriums': {
            req.on('data', chunk => {
                jsonData += chunk;
            });
            req.on('end', () => {
                jsonData = JSON.parse(jsonData);
                console.log("jsonData: " + JSON.stringify(jsonData));
                res.writeHead(200, {'Content-Type': 'application/json'});
                DB.findAuditorium(jsonData.AUDITORIUM).then((result) => {
                    if(result.recordset.length == 0) throw 'Auditorium not found';
                    res.write(JSON.stringify(result.recordset));
                }).catch(error => { errorHandler(res, 20, error); });
                
                DB.putAuditoriums(jsonData.AUDITORIUM, jsonData.AUDITORIUM_NAME, jsonData.AUDITORIUM_CAPACITY, jsonData.AUDITORIUM_TYPE).then(records => {
                    res.end();
                }).catch(error => { errorHandler(res, 21, error); });
            });
            break;
        }

        default: {
            methodNotRecognized(res);
            break;
        }
    }
}