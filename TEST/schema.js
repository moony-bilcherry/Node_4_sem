const {buildSchema}=require('graphql');

const schema=buildSchema(`
schema {
    query: Query,
    mutation: Mutation
}
type Faculty {
    FACULTY: String,
    FACULTY_NAME: String
}
type Pulpit {
    PULPIT: String!,
    PULPIT_NAME: String!,
    FACULTY: String!
    SUBJECTS: [Subject]
}
type Teacher {
    TEACHER: String!,
    TEACHER_NAME: String!,
    PULPIT: String!
}
type Subject {
    SUBJECT: String!,
    SUBJECT_NAME: String!,
    PULPIT: String!
}
type Query {
    getFaculties(faculty: String): [Faculty],
    getPulpits(pulpit: String): [Pulpit],
    getTeachers(teacher: String): [Teacher],
    getSubjects(subject: String): [Subject],
    getTeachersByFaculty(faculty: String!): [Teacher],
    getSubjectsByFaculties(faculty: String!): [Pulpit]
}
type Mutation {
    setFaculty(faculty: String!, faculty_name: String!): Faculty,
    setPulpit(pulpit: String!, pulpit_name: String!, faculty: String!): Pulpit,
    setTeacher(teacher: String!, teacher_name: String!, pulpit: String!): Teacher,
    setSubject(subject: String!, subject_name: String!, pulpit: String!): Subject,
    delFaculty(faculty: String!): Boolean,
    delPulpit(pulpit: String!): Boolean,
    delTeacher(teacher: String!): Boolean,
    delSubject(subject: String!): Boolean
}
`)


module.exports=schema;