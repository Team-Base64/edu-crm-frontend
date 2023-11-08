export const studentPaths = {
    student: (student_id: string | number) => `students/${student_id}`,
    classStudents: (class_id: string | number) => `classes/${class_id}/students`,
};
