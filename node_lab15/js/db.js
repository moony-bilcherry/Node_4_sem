const MongoClient = require('mongodb').MongoClient;

class DB {
    constructor()
    {
        this.url = 'mongodb+srv://moony:moony@node14.rsjzr.mongodb.net/BSTU?retryWrites=true&w=majority';
        this.client = new MongoClient(this.url, {useNewUrlParser: true, useUnifiedTopology: true});
        this.client = this.client.connect().then(connection => {return connection.db("BSTU")});
        console.log("Connected to MongoDB");
    }

    GetRecordsByTableName(tableName) {
        return this.client.then(db => {
            return db.collection(tableName).find({}).toArray();
        });
    }

    InsertFaculty(fields) {
        return this.client
            .then(async db => {
                let tableCol= JSON.parse('{"faculty": "'+ fields.faculty +'"}');
                console.log(fields.faculty);
                await db.collection('faculty').findOne(tableCol).then(record => {
                    if (record) throw 'this document already exists';
                    return record;});
                db.collection('faculty').insertOne(fields, (err, r) =>{
                    if(err) console.log(err);
                    else console.log(r.insertedCount);
                });
                return this.GetRecord('faculty', tableCol);
            });
    }
    
    InsertPulpit(fields) {
        return this.client
            .then(async db => {
                let tableCol= JSON.parse('{"pulpit": "'+ fields.pulpit +'"}');
                console.log(fields.faculty);
                await db.collection('pulpit').findOne(tableCol).then(record => {
                    if (record) throw 'this document already exists';
                    return record;});
                db.collection('pulpit').insertOne(fields, (err, r) =>{
                    if(err) console.log(err);
                    else console.log(r.insertedCount);
                });
                return this.GetRecord('pulpit', tableCol);
            });
    }

    GetRecord(tableName, fields) {
        return this.client
            .then(db => {
                return db.collection(tableName).findOne(fields);
            })
            .then(record => {
                if (!record) throw 'No records';
                return record;
            });
    }

    UpdateFaculty(fields, newName) {
        return this.client
            .then(async db => {
                return db.collection('faculty')
                    .findOneAndUpdate(
                        { faculty: fields.faculty },
                        { $set: { 
                            faculty_name: newName 
                        } },
                        { returnDocument: "after" });
            })
    }

    UpdatePulpit(fields, newName, newFac) {
        return this.client
            .then(async db => {
                return db.collection('pulpit')
                    .findOneAndUpdate(
                        { pulpit: fields.pulpit },
                        { $set: { 
                            pulpit_name: newName, 
                            faculty: newFac
                        } },
                        { returnDocument: "after" });
            })
    }

    DeleteFaculty(fac) {
        return this.client
            .then(async db => {
                return db.collection('faculty')
                    .findOneAndDelete({ faculty: fac });
            })
    }

    DeletePulpit(pul) {
        return this.client
            .then(async db => {
                return db.collection('pulpit')
                    .findOneAndDelete({ pulpit: pul });
            })
    }
}

module.exports = DB;