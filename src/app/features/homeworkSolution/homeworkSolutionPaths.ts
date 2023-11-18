export const homeworkSolutionPaths = {
    solutions: `solutions`,
    solution: (id: number | string) => `solutions/${id}`,
    classSolutions: (class_id: string | number) =>
        `classes/${class_id}/solutions`,
};
