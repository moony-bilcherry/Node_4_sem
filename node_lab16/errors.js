isJson = (headers, header, mime) => {
	let rc = false;
	let h = headers[header];
	if(h) rc = f.indexOf(mime) >=0;
	return rc;
}

exports.isJsonContentType = (hs) => isJson(hs, 'content-type', 'application/json');
exports.isJsonAccept = (hs) => isJson(hs, 'accept', 'application/json');

const Error400 = (response, smess) => {
    console.log(smess);
    response.writeHead(400, {'Content-Type':'application/json; charset=utf-8'});
    response.statusMessage = smess;
    response.end(smess);
};
  
const Resp200 = (response, smess, mess) => {
	console.log(smess, mess);
	response.writeHead(200, {'Content-Type':'application/json; charset=utf-8'});
	response.statusMessage = smess;
	response.end(mess);
};
  
// обработка результата
function IsError (result) {
	this.then = () => { return this };
	this.else = () => { return this };
	if (result.errors) {
		this.then = (cb) => {
			let json = JSON.stringify({error: result.errors[0].message});
			cb(json);
			return this;
		}
	}
	else if (result.data) {
		this.else = (cb) => {
			let json = JSON.stringify(result.data);
			cb(json);
			return this;
		}
	}
}

module.exports = {
	Resp200,
	Error400,
	IsError
};