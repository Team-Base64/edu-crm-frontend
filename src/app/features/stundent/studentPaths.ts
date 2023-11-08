export const studentPaths = {
    student: (student_id: string | number) => `student/${student_id}`,
    classStudents: (class_id: string | number) => `class/${class_id}/students`,
};
