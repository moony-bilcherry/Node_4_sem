const util = require('util');   // inherits
const ee = require('events');   // EventEmitter

let db_data = [
    { id: 1, name: 'SHinji Ikari', bday: '2001-06-06' },
    { id: 2, name: 'Rei Ayanami', bday: '2001-03-30' },
    { id: 3, name: 'Asuka Langley Soryu', bday: '2001-12-04' },
    { id: 4, name: 'Misato Katsuragi', bday: '1986-12-08' }
];

function DB() {
    this.getIndex = () => { return db_data.length + 1; };

    this.select = () => { return db_data; }
    this.insert = (row) => { db_data.push(row); }

}

util.inherits(DB, ee.EventEmitter);
exports.DB = DB;