function getRecordsByField(object, field, context) {
    const fields = {};
    fields[object + '_Id'] = field;

    let records = [];
    if (field) {
        records =  context.getOne(object, fields);
    } else {
        records =  context.getAll(object);
    }
    return records;
}
async function mutateRecord(object, idField, fields, context) {
    // If id specified then we can use only it to search the record, if it isn't then it doesn't matter
    return await context.getOne(object, idField ? idField : fields)
        .then(async records => {
            let targetRecord = {};
            // If the record exists
            if (records.length > 0) {
                // Then update it and return updated variant
                targetRecord = await context.updateOne(object, fields)
                    .then(() => context.getOne(object, fields));
            } else {
                // delete id field from fields object
                delete fields[Object.keys(fields).find(field => fields[field] === idField)];
                //delete fields.Faculty_Id;
                // If there no, insert new one and return it
                targetRecord = await context.insertOne(object, fields)
                    .then(() => context.getOne(object, fields));
            }
            return targetRecord[0];
        });
}
async function deleteRecord(object, id, context) {
    let recordIdObject = {};
    recordIdObject[object] = id;
    let targetFaculty = await context.getOne(object, recordIdObject);
    context.deleteOne(object, id);
    return targetFaculty[0];
}


module.exports = {
    getFaculties: (args, context) => getRecordsByField('Faculty', args.faculty, context),
    getPulpits: (args, context) => getRecordsByField('Pulpit', args.pulpit, context),
    getSubjects: async (args, context) => {
        const {subject, faculty} = args;
        return faculty ?
            await context.query(
                `SELECT * FROM Subject s
                    JOIN Pulpit p ON s.Pulpit = p.Pulpit_Id 
                    JOIN Faculty f ON p.Faculty = f.Faculty_Id
                    WHERE p.Faculty = ${faculty};`
            ) : await getRecordsByField('Subject', subject, context);
    },
    getTeachers: async (args, context) => {
        const {teacher, faculty} = args;
        return faculty ?
            await context.query(
                `SELECT * FROM Teacher t 
                    JOIN Pulpit p ON t.Pulpit = p.Pulpit_Id 
                    JOIN Faculty f ON p.Faculty = f.Faculty_Id
                    WHERE p.Faculty = ${faculty};`
            ) : await getRecordsByField('Teacher', teacher, context);
    },
    setFaculty: (args, context) => {
        let fields = {Faculty_Id: args.faculty.facultyId, Faculty_Name: args.faculty.facultyName};
        return mutateRecord('Faculty', fields.Faculty_Id, fields, context);
    },
    setPulpit: async (args, context) => {
        let fields = {Pulpit_Id: args.pulpit.pulpitId, Pulpit_Name: args.pulpit.pulpitName, Faculty: args.pulpit.facultyId};
        return mutateRecord('Pulpit', fields.Pulpit_Id, fields, context);
    },
    setSubject: async (args, context) => {
        let fields = {Subject_Id: args.subject.subjectId, Subject_Name: args.subject.subjectName, Pulpit: args.subject.pulpitId};
        return mutateRecord('Subject', fields.Subject_Id, fields, context);
    },
    setTeacher: async (args, context) => {
        let fields = {Teacher_Id: args.teacher.teacherId, Teacher_Name: args.teacher.teacherName, Pulpit: args.teacher.pulpitId};
        return mutateRecord('Teacher', fields.Teacher_Id, fields, context);
    },

    delFaculty: (args, context) => deleteRecord('FACULTY', args.FACULTY, context),
    delPulpit: (args, context) => deleteRecord('Pulpit', args.id, context),
    delSubject: (args, context) => deleteRecord('Subject', args.id, context),
    delTeacher: (args, context) => deleteRecord('Teacher', args.id, context)
};