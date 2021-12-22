const sql = require('mssql');

const config = {
    user: 'node',
    password: 'node',
    server: 'MOONY-SHTO',
    port: 1433,
    database: "NODE14",
    options: {
        trustServerCertificate: true
    }
};

class DB {
    constructor()
    {
        this.connectionPool = new sql.ConnectionPool(config).connect().then(pool =>{
            console.log('Connected to MS SQL server');
            return pool;
        }).catch(err => console.log('Connection failed: ', err));
    }

    // методы SELECT *

    getFaculties() {
        return this.connectionPool.then(pool => pool.request()
            .query('select * from FACULTY'))
    }
    getPulpits() {
        return this.connectionPool.then(pool => pool.request()
            .query('select * from PULPIT'))
    }
    getSubjects() {
        return this.connectionPool.then(pool => pool.request()
            .query('select * from SUBJECT'))
    }
    getAuditoriumTypes() {
        return this.connectionPool.then(pool => pool.request()
            .query('select * from AUDITORIUM_TYPE'))
    }
    getAuditoriums() {
        return this.connectionPool.then(pool => pool.request()
            .query('select * from AUDITORIUM'))
    }

    // методы INSERT

    postFaculties(faculty, facultyName) {
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('fac', sql.NVarChar, faculty)
                .input('facName', sql.NVarChar, facultyName)
                .query('insert FACULTY(FACULTY, FACULTY_NAME) values (@fac, @facName)');
        });
    }
    postPulpits(pulpit, pulpitName, faculty) {
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('pulpit', sql.NVarChar, pulpit)
                .input('pulpitName', sql.NVarChar, pulpitName)
                .input('faculty', sql.NVarChar, faculty)
                .query('insert PULPIT(PULPIT, PULPIT_NAME, FACULTY) values (@pulpit, @pulpitName, @faculty)');
        });
    }
    postSubjects(subject, subjectName, pulpit) {
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('subject', sql.NVarChar, subject)
                .input('subjectName', sql.NVarChar, subjectName)
                .input('pulpit', sql.NVarChar, pulpit)
                .query('insert SUBJECT(SUBJECT, SUBJECT_NAME, PULPIT) values (@subject, @subjectName, @pulpit)');
        });
    }
    postAuditoriumTypes(type, typeName) {
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('type', sql.NVarChar, type)
                .input('typeName', sql.NVarChar, typeName)
                .query('insert AUDITORIUM_TYPE(AUDITORIUM_TYPE, AUDITORIUM_TYPENAME) values (@type, @typeName)');
        });
    }
    postAuditoriums(auditorium, auditorium_name, auditorium_capacity, auditorium_type) {
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('auditorium', sql.NVarChar, auditorium)
                .input('auditorium_name', sql.NVarChar, auditorium_name)
                .input('auditorium_capacity', sql.Int, auditorium_capacity)
                .input('auditorium_type', sql.NVarChar, auditorium_type)
                .query('INSERT AUDITORIUM(AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_CAPACITY, AUDITORIUM_TYPE)' +
                             ' values(@auditorium, @auditorium_name, @auditorium_capacity, @auditorium_type)');
        });
    }

    // методы для поиска по первичному ключу

    findFaculty(faculty)
    {
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('fac',sql.NVarChar, faculty)
                .query('select * from FACULTY where faculty = @fac')});
    }
    findPulpit(pulpit)
    {
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('pulp',sql.NVarChar, pulpit)
                .query('select * from PULPIT where pulpit = @pulp')});
    }
    findSubject(subject)
    {
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('sub',sql.NVarChar, subject)
                .query('select * from Subject where subject = @sub')});
    }
    findAuditorium(audit)
    {
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('audit',sql.NVarChar, audit)
                .query('select * from AUDITORIUM where AUDITORIUM = @audit')});
    }
    findAuditoriumType(type)
    {
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('type',sql.NVarChar, type)
                .query('select * from AUDITORIUM_TYPE where AUDITORIUM_TYPE = @type')});
    }

    // методы UPDATE

    putFaculties(faculty, facultyName) {
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('fac', sql.NVarChar, faculty)
                .input('facName', sql.NVarChar, facultyName)
                .query('update FACULTY set FACULTY_NAME = @facName where FACULTY = @fac');
        });
    }
    putPulpits(pulpit, pulpitName, faculty) {
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('pulpit', sql.NVarChar, pulpit)
                .input('pulpitName', sql.NVarChar, pulpitName)
                .input('faculty', sql.NVarChar, faculty)
                .query('update PULPIT set PULPIT_NAME = @pulpitName, FACULTY = @faculty where PULPIT = @pulpit');
        });
    }
    putSubjects(subject, subjectName, pulpit) {
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('subject', sql.NVarChar, subject)
                .input('subjectName', sql.NVarChar, subjectName)
                .input('pulpit', sql.NVarChar, pulpit)
                .query('update SUBJECT set SUBJECT_NAME = @subjectName, PULPIT = @pulpit where SUBJECT = @subject');
        });
    }
    putAuditoriumTypes(type, typeName) {
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('type', sql.NVarChar, type)
                .input('typeName', sql.NVarChar, typeName)
                .query('update AUDITORIUM_TYPE set AUDITORIUM_TYPENAME = @typeName where AUDITORIUM_TYPE = @type');
        });
    }
    putAuditoriums(auditorium, auditorium_name, auditorium_capacity, auditorium_type) {
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('auditorium', sql.NVarChar, auditorium)
                .input('auditorium_name', sql.NVarChar, auditorium_name)
                .input('auditorium_capacity', sql.Int, auditorium_capacity)
                .input('auditorium_type', sql.NVarChar, auditorium_type)
                .query('update AUDITORIUM set AUDITORIUM_NAME = @auditorium_name, AUDITORIUM_CAPACITY = @auditorium_capacity, AUDITORIUM_TYPE = @auditorium_type' +
                             ' where AUDITORIUM = @auditorium');
        });
    }

    // методы для поиска по первичному ключу

    deleteFaculty(faculty)
    {
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('fac',sql.NVarChar, faculty)
                .query('delete from FACULTY where faculty = @fac')});
    }
    deletePulpit(pulpit)
    {
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('pulp',sql.NVarChar, pulpit)
                .query('delete from PULPIT where pulpit = @pulp')});
    }
    deleteSubject(subject)
    {
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('sub',sql.NVarChar, subject)
                .query('delete from Subject where subject = @sub')});
    }
    deleteAuditoriumType(type)
    {
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('type',sql.NVarChar, type)
                .query('delete from AUDITORIUM_TYPE where AUDITORIUM_TYPE = @type')});
    }
    deleteAuditorium(audit)
    {
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('audit',sql.NVarChar, audit)
                .query('delete from AUDITORIUM where AUDITORIUM = @audit')});
    }
}

module.exports = DB;