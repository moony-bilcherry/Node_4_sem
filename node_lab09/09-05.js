const http = require('http');
const parseString = require('xml2js').parseString;
const xmlBuilder = require('xmlbuilder');

let xmlDoc = xmlBuilder.create("request").att("id", 33)
xmlDoc.ele("x").att("value", 1);
xmlDoc.ele("x").att("value", 2);
xmlDoc.ele("x").att("value", 3);
xmlDoc.ele("x").att("value", 4);
xmlDoc.ele("m").att("value", "hi");
xmlDoc.ele("m").att("value", "!!!!!");
xmlDoc.ele("m").att("value", "bye");

let options = {
    host: 'localhost',
    path: '/0905',
    port: 5000,
    method: 'POST',
    headers: {
        'Content-Type': 'text/xml',
        'Accept': 'text/xml'
    }
}

const req = http.request(options, (res) => {
    console.log(`res.response (statusCode) = ${res.statusCode}`);
    
    let data = "";
    res.on("data", (chunk) => {
        data += chunk;
    });
    res.on("end", () => {
        console.log(`http.request: end: body = ${data}`);
        parseString(data, (err, str) => {
            if(err) console.log('xml parse error');
            else {
                console.log(`str = ${str}`);
            }
        })
    });
});

req.on('error', (e) => {
    console.log(`http.request: error: ${e.message}`);
});
req.end(xmlDoc.toString({ pretty: true }));