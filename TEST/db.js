const sql = require('mssql');

const connectionPool = new sql.ConnectionPool({
    user: 'node',
    password: 'node',
    server: 'MOONY-SHTO',
    port: 1433,
    database: "NODE14",
    options: {
        trustServerCertificate: true
    }
}).connect().then(pool =>{
    console.log('Connected to MS SQL server');
    return pool;
}).catch(err => console.log('Connection failed: ', err));;

class Db {

    query(query) {
        return connectionPool
            .then(pool => pool.query(query))
            .then(response => response.recordset);
    }

    getAll(tableName) {
        return connectionPool
            .then(pool => pool.query(`SELECT * FROM ${tableName}`))
            .then(response => response.recordset);
    }

    getOne(tableName, fields) {
        return connectionPool.then(pool => {
            const request = pool.request();
            let command = `SELECT TOP(1) * FROM ${tableName} WHERE`;
            Object.keys(fields).forEach(field => {
                let fieldType = Number.isInteger(fields[field]) ? sql.Int : sql.NVarChar;
                request.input(field, fieldType, fields[field]);
                command += ` ${field} = @${field} AND`;
            });
            command = command.slice(0, -3);
            return request.query(command);
        }).then(response => response.recordset);
    }

    insertOne(tableName, fields) {
        return connectionPool.then(pool => {
            const request = pool.request();
            let command = `INSERT INTO ${tableName} values (`;
            Object.keys(fields).forEach(field => {
                let fieldType = Number.isInteger(fields[field]) ? sql.Int : sql.NVarChar;
                request.input(field, fieldType, fields[field]);
                command += `@${field},`;
            });
            command = command.replace(/.$/,")");
            return request.query(command);
        });
    }

    updateOne(tableName, fields) {
        return connectionPool.then(pool => {
            const idField = tableName + '_Id';
            if (!fields[idField] || !Number.isInteger(fields[idField])) {
                throw 'There are no Id value has been provided. Example: {TableName}_Id';
            }
            const request = pool.request();
            let command = `UPDATE ${tableName} SET `;
            Object.keys(fields).forEach(field => {
                let fieldType = Number.isInteger(fields[field]) ? sql.Int : sql.NVarChar;
                request.input(field, fieldType, fields[field]);
                if (!field.endsWith('Id')) {
                    command += `${field} = @${field},`;
                }
            });
            command = command.slice(0, -1);
            command += ` WHERE ${idField} = @${idField}`;
            return request.query(command);
        });
    }

    deleteOne(tableName, id) {
        return connectionPool.then(pool => {
            /*if (!id || !Number.isInteger(Number(id))) {
                throw 'There are no Id value has been provided. Example: /api/instances/:id';
            }*/
            return pool.query(`DELETE FROM ${tableName} WHERE ${tableName} = ${id}`);
        });
    }
}

module.exports = Db;