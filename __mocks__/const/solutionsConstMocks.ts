import { HomeworkSolution } from '../../src/app/features/homeworkSolution/homeworkSolutionModel';

interface IclassSolutionsMock {
    [key: number]: HomeworkSolution[];
}

export const solutionsMock: HomeworkSolution[] = [
    {
        id: 0,
        hwID: 0,
        file: '',
        studentID: 0,
        createTime: Date.now() - 1000,
    },
    {
        id: 1,
        hwID: 1,
        file: '',
        studentID: 1,
        createTime: Date.now() - 1000,
    },
    {
        id: 2,
        hwID: 2,
        file: '',
        studentID: 2,
        createTime: Date.now() - 500,
    },

    {
        id: 3,
        hwID: 1,
        file: '',
        studentID: 0,
        createTime: Date.now() - 4000,
    },
];

export const classSolutionsMock: IclassSolutionsMock = {
    0: [solutionsMock[0]],

    1: [solutionsMock[1], solutionsMock[2], solutionsMock[3]],
};
