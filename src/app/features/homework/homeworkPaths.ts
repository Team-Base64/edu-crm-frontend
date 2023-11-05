export const homeworkPaths = {
    homeworks: 'homeworks',
    homework: (id: string | number) => `homework/${id}`,
    homeworkCreate: (class_id: string | number) =>
        `class/${class_id}/homeworks`,
    classHomeworks: (class_id: string | number) => `class/${class_id}/homework`,
};
