export const apiPaths = {
    origin: 'http://127.0.0.1:8080',
    basePath: `http://127.0.0.1:8080/api/`,
    chats: 'chats',

    classes: 'class',
    class: (class_id: string | number) => `class/${class_id}`,
    classCreate: 'class',
    classStundets: (class_id: string | number) => `class/${class_id}/students`,
    classAnnouncements: (class_id: string | number) => `class/${class_id}/feed`,
    classAnnouncementCreate: (class_id: string | number) =>
        `class/${class_id}/feed`,
    classHomeworks: (class_id: string | number) => `class/${class_id}/homework`,
    classHomeworkSolutions: (class_id: string | number) =>
        `class/${class_id}/solutions`,
    homeworkCreate: (class_id: string | number) => `class/${class_id}/homework`,
    homework: (hw_id: number | string) => `homework/${hw_id}`,

    student: (student_id: number | string) => `student/${student_id}`,
};

export const noop = () => {};

export const maxLengthOfMessage = 4096;
