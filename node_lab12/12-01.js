const http = require('http');
const fs = require('fs');
const url = require('url');
const ws = require('ws');

const listFilePath = 'files/StudentList.json'

function methodNotRecognized(req, res) {
    errorHandler(req, res, 0, `Method not recognised :[`);
}

function errorHandler(req, res, code, mess) {
    res.writeHead(500, 'yikes', { 'Content-Type': 'application/json; charset=utf-8'});
    res.end(`{"error": "${code}", "message": "${mess}"}`)
}

function modifiedReadFile() {
    fs.accessSync(listFilePath, fs.constants.F_OK);
    console.log(`File ${listFilePath} successfully accessed`);
    return JSON.parse(fs.readFileSync(listFilePath))
};

let http_handler = (req, res) => {
    let path = url.parse(req.url).pathname;

    if(req.method === 'GET') {
        switch(true) {
            case path === '/': {
                try {
                    res.writeHead(200, {'Content-Type' : 'application/json; charset=utf-8'});
                    res.end(JSON.stringify(modifiedReadFile()));
                } catch (e) {
                    errorHandler(req, res, 1, `Unable to read the file (${listFilePath})`);
                }
                break;
            }
            case /\/\d+/.test(path): {
                let n =+ path.split('/')[1];
                let flag = false;
                modifiedReadFile().forEach(el => {
                    if(el.id === n) {
                        flag = true;
                        res.writeHead(200, {'Content-Type' : 'application/json; charset=utf-8'});
                        res.end(JSON.stringify(el));
                    }
                });
                if (!flag) errorHandler(req, res, 2, `GET error: Student #${n} not found`);
                break;
            }
            case path === '/backup': {
                fs.readdir('./backup', (err, files) => {
                    res.writeHead(200, {'Content-Type' : 'application/json; charset=utf-8'});                    let json = [];
                    let listOfBackups = [];
                    for (let i = 0; i < files.length; i++) {
                        listOfBackups.push({
                            id: i,
                            name: files[i]
                        });
                    }
                    res.end(JSON.stringify(listOfBackups));
                    console.log(files.length);
                });
                break;
            }
            default: {
                methodNotRecognized(req, res);
                break;
            }
        }
    }

    if(req.method === 'POST') {
        switch(true) {
            case path === '/': {
                let flag = false;
                let body = '';
                let fetchedFromFile = modifiedReadFile();

                req.on('data', function (data) {
                    body += data;
                });

                req.on('end', () => {
                    fetchedFromFile.forEach(el => {
                        if(el.id === JSON.parse(body).id) {
                            flag = true;
                            errorHandler(req, res, 3, `POST error: Student #${JSON.parse(body).id} already exists`);
                        }
                    });
                    if(!flag) {
                        fetchedFromFile.push(JSON.parse(body));
                        fs.writeFile(listFilePath, JSON.stringify(fetchedFromFile), (e) => {
                            if (e) {
                                console.log('idk some error during writeFile');
                                errorHandler(req, res, e.code, e.message);
                            } else {
                                console.log('New student added');
                                res.writeHead(200, {'Content-Type' : 'application/json; charset=utf-8'});
                                res.end(JSON.stringify(JSON.parse(body)));
                            }
                        })
                    }
                });
                break;
            }
            case path === '/backup': {
                var now = new Date();
                date = now.toISOString().split('.')[0].replace(/[^\d]/gi,'');

                fs.copyFile(listFilePath, `./backup/${date}_StudentList.json`, (e) => {
                    if (e) {
                        console.log('error');
                        errorHandler(req, res, e.code, e.message);
                    }
                    else {
                        console.log('Backup successfully created');
                        res.end('Backup successfully created');
                    }
                });
                break;
            }
            default: {
                methodNotRecognized(req, res);
                break;
            }
        }
    }

    if(req.method === 'PUT') {
        switch(true) {
            case path === '/': {
                let flag = false;
                let body = '';
                let fetchedFromFile = modifiedReadFile();

                req.on('data', function (data) {
                    body += data;
                });

                req.on('end', () => {
                    fetchedFromFile.forEach(el => {
                        if(el.id === JSON.parse(body).id) {
                            flag = true;
                            el.name = JSON.parse(body).name;
                            el.speciality = JSON.parse(body).speciality;
                        }
                    });
                    if(flag) {
                        fs.writeFile(listFilePath, JSON.stringify(fetchedFromFile), (e) => {
                            if (e) {
                                console.log('idk some error during writeFile');
                                errorHandler(req, res, e.code, e.message);
                            } else {
                                console.log(`Student was updated`);
                                res.writeHead(200, {'Content-Type' : 'application/json; charset=utf-8'});
                                res.end(JSON.stringify(JSON.parse(body)));
                            }
                        });
                    } else {
                        errorHandler(req, res, 4, `PUT error: Student #${JSON.parse(body).id} wasn't found`);
                    }
                });
                break;
            }
            default: {
                methodNotRecognized(req, res);
                break;
            }
        }
    }

    if(req.method === 'DELETE') {
        switch(true) {
            case /\/backup\/\d{8}/.test(path): {
                let flag = false;
                fs.readdir('./backup', (err, files) => {
                    for (let i = 0; i < files.length; i++) {
                        if (files[i].match(/\d{8}/)[0] < Number(path.match(/\d+/))) {
                            flag = true;
                            fs.unlink(`./backup/${files[i]}`, (e) => {
                                if (e) {
                                    console.log('Error');
                                    errorHandler(req, res, e.code, e.message);
                                } else {
                                    res.end('Old logfiles successfully deleted');
                                }
                            });
                        }
                    }
                    if (!flag) {
                        errorHandler(req, res, 6, 'Files before the specified date were not found');
                    }
                });
                break;
            }            
            case /\/\d+/.test(path): {
                let n =+ path.split('/')[1];
                let flag = false;
                let fetchedFromFile = modifiedReadFile();
                
                for (let i = 0; i < fetchedFromFile.length; i++) {
                    if(fetchedFromFile[i].id == n) {
                        flag = true;
                        res.writeHead(200, {'Content-Type' : 'application/json; charset=utf-8'});
                        res.write(JSON.stringify(fetchedFromFile[i]));
                        
                        delete fetchedFromFile[i];
                        fetchedFromFile = fetchedFromFile.filter(function(x) {
                            return x !== null;
                        });
                    }
                }
                if(flag){
                    fs.writeFile(listFilePath, JSON.stringify(fetchedFromFile), (e) => {
                        if (e) {
                            console.log('idk some error during writeFile');
                            errorHandler(req, res, e.code, e.message);
                        } else {
                            console.log(`Student was deleted`);
                            res.end();
                        }
                    });
                }
                else errorHandler(req, res, 5, `DELETE error: Student #${n} not found`);
                break;
            }
            
            default: {
                methodNotRecognized(req, res);
                break;
            }
        }
    }
    
}

let server = http.createServer();

server.listen(5000, () => {
    console.log('Server running at http://localhost:5000/');
}).on('error', (e) => {
    console.log('Server running at http://localhost:5000/ : ERROR = ', e.code);
}).on('request', http_handler);

let wsServer = new ws.Server({port: 4000, host: 'localhost', path: '/broadcast'});

wsServer.on('connection', (ws) => {
    fs.watch(listFilePath, {encoding: 'buffer'}, (eventType, filename) => {
        if(eventType === 'change') {
            wsServer.clients.forEach((client) => {
                if (client.readyState === ws.OPEN) {
                    client.send(`File ${filename} was modified`);
                }
            });
        }
    });
    fs.readdir('./backup', (err, files) => {
        for (let i = 0; i < files.length; i++) {
            fs.watch(('./backup/' + files[i]), {encoding: 'buffer'}, (eventType, filename) => {
                if(eventType === 'change') {
                    wsServer.clients.forEach((client) => {
                        if (client.readyState === ws.OPEN) {
                            client.send(`File ${filename} was modified`);
                        }
                    });
                }
            });
        }
        console.log(files.length);
    });
});
wsServer.on('error', (e) => { console.log('ws server error', e); });
console.log(`WS server: host: ${wsServer.options.host}, post: ${wsServer.options.port}, path: ${wsServer.options.path}`);