const util = require('util');   // inherits
const ee = require('events');   // EventEmitter

let db_data = [
    { id: 1, name: 'Shinji Ikari', bday: '2001-06-06' },
    { id: 2, name: 'Rei Ayanami', bday: '2001-03-30' },
    { id: 3, name: 'Asuka Langley Soryu', bday: '2001-12-04' },
    { id: 4, name: 'Misato Katsuragi', bday: '1986-12-08' }
];

function DB() {
    this.getIndex = () => { return db_data.length + 1; };

    this.select = () => { return db_data; }
    this.insert = (row) => { 
        console.log(row);
        db_data.push(row); 
        return row; 
    }
    this.update = (row) => { 
        console.log(row);
        let index = db_data.findIndex(el => el.id === parseInt(row.id));
        if(index === -1) return JSON.parse('{"ERROR": "id not found"}');
        db_data.splice(index, 1, row);
        return row;
    }
    this.delete = (id) => { 
        console.log(id);
        let index = db_data.findIndex(el => el.id === parseInt(id));
        if(index === -1) return JSON.parse('{"ERROR": "id not found"}');
        let del_row = db_data[index];
        db_data.splice(index, 1);
        return del_row;
    }
}

util.inherits(DB, ee.EventEmitter);
exports.DB = DB;