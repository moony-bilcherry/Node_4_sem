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
                console.log("jsonData: " + JSON.stringify(jsonData));
                res.writeHead(200, {'Content-Type': 'application/json'});
                DB.postFaculties(jsonData.FACULTY, jsonData.FACULTY_NAME).then(records => {
                    res.end(JSON.stringify(jsonData));
                }).catch(error => { errorHandler(res, 7, error); });
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
                DB.postPulpits(jsonData.PULPIT, jsonData.PULPIT_NAME, jsonData.FACULTY).then(records => {
                    res.end(JSON.stringify(jsonData));
                }).catch(error => { errorHandler(res, 8, error); });
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
                DB.postSubjects(jsonData.SUBJECT, jsonData.SUBJECT_NAME, jsonData.PULPIT).then(records => {
                    res.end(JSON.stringify(jsonData));
                }).catch(error => { errorHandler(res, 9, error); });
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
                DB.postAuditoriumTypes(jsonData.AUDITORIUM_TYPE, jsonData.AUDITORIUM_TYPENAME).then(records => {
                    res.end(JSON.stringify(jsonData));
                }).catch(error => { errorHandler(res, 10, error); });
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
                DB.postAuditoriums(jsonData.AUDITORIUM, jsonData.AUDITORIUM_NAME, jsonData.AUDITORIUM_CAPACITY, jsonData.AUDITORIUM_TYPE).then(records => {
                    res.end(JSON.stringify(jsonData));
                }).catch(error => { errorHandler(res, 11, error); });
            });
            break;
        }

        default: {
            methodNotRecognized(res);
            break;
        }
    }
}