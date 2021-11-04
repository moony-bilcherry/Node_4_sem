let fs = require('fs');

function Stat(folder = './static') {
    this.staticFolder = folder;

    let pathStatic = (fileName) => { return `${this.staticFolder}${fileName}`; }

    // проверка расширения файла из url
    this.isStatic = (extension, fileName) => { 
        let regEx = new RegExp(`^\/.+\.${extension}`); 
        return regEx.test(fileName);
    }
    this.writeHTTP404 = (response) => {
        response.statusCode = 400;
        response.statusMessage = 'Resourse not found';
        response.end('Resourse not found');
    }
    let pipeFile = (req, res, headers) => {
        res.writeHead(200, headers);
        fs.createReadStream(pathStatic(req.url)).pipe(res);
    }
    this.sendFile = (req, res, headers) => {
        fs.access(pathStatic(req.url), fs.constants.R_OK, err => {
            if(err) this.writeHTTP404(res);
            else pipeFile(req, res, headers);
        })
    }
}

module.exports = (parm) => new Stat(parm);