const resolver = {
    getFaculties: (args, context) => {
        return  (args.FACULTY) ? context.getFaculty(args, context) : context.getFaculties(args, context);
    },

    getPulpits: (args, context) => {
        return  (args.PULPIT) ?context.getPulpit(args, context) : context.getPulpits(args, context);
    },

    getSubjects: (args, context) => {
        return  (args.SUBJECT) ? context.getSubject(args, context) : context.getSubjects(args, context);
    },

    getTeachers: (args, context) => {
        return  (args.TEACHER) ? context.getTeacher(args, context) : context.getTeachers(args, context);
    },

    // попробуй ловить ошибку в db.js
    setFaculty: async (args, context) => {
        let res = await context.updateFaculty(args, context);
        return (res == null) ? context.insertFaculty(args, context) : res;
    },

    setPulpit: async (args, context) => {
        let res = await context.updatePulpit(args, context);
        return  (res == null) ? context.insertPulpit(args, context) : res;
    },

    setSubject: async (args, context) => {
        let res = await context.updateSubject(args, context);
        return  (res == null) ? context.insertSubject(args, context) : res;
    },

    setTeacher: async (args, context) => {
        let res = await context.updateTeacher(args, context);
        return (res == null) ? context.insertTeacher(args, context) : res;
    },

    delFaculty: async (args, context) => {
        let deletedFaculty = (await context.getFaculty(args, context))[0];
        let res = await context.delFaculty(args, context);
        return (res == null) ? res : deletedFaculty;
    },

    delPulpit: async (args, context) => {
        let deletedPulpit = (await context.getPulpit(args, context))[0];
        let res = await context.delPulpit(args, context);
        return (res == null) ? res : deletedPulpit;
    },

    delSubject: async (args, context) => {
        let deletedSubject = (await context.getSubject(args, context))[0];
        let res = await context.delSubject(args, context);
        return (res == null) ? res : deletedSubject;
    },

    delTeacher: async (args, context) => {
        let deletedTeacher = (await context.getTeacher(args, context))[0];
        let res = await context.delTeacher(args, context);
        return (res == null) ? res : deletedTeacher;
    },

    getTeachersByFaculty: (args, context) => context.getTeachersByFaculty(args, context),
    getSubjectsByFaculties: (args, context) => context.getSubjectsByFaculties(args, context)
};

module.exports = resolver;