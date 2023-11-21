export const homeworkSolutionPaths = {
    solutions: `solutions`,
    solution: (id: number | string) => `solutions/${id}`,
    classSolutions: (classID: string | number) =>
        `classes/${classID}/solutions`,
    homeworkSolutions: (homeworkID: number | string) => `homeworks/${homeworkID}/solutions`,
};
