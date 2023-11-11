export const homeworkPaths = {
    homeworks: 'homeworks',
    homework: (id: string | number) => `homeworks/${id}`,
    homeworkCreate: `homeworks`,
    classHomeworks: (class_id: string | number) => `classes/${class_id}/homeworks`,
};
