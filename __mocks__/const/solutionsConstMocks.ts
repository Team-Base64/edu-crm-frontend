import { HomeworkSolution } from '../../src/app/features/models';

interface IclassSolutionsMock {
    [key: number]: HomeworkSolution[];
}

export const solutionsMock: HomeworkSolution[] = [
    {
        id: 0,
        homework_id: 0,
        link_to_file: '',
        student_id: 0,
        time: Date.now() - 1000,
    },
    {
        id: 1,
        homework_id: 1,
        link_to_file: '',
        student_id: 1,
        time: Date.now() - 1000,
    },
    {
        id: 2,
        homework_id: 2,
        link_to_file: '',
        student_id: 2,
        time: Date.now() - 500,
    },

    {
        id: 3,
        homework_id: 1,
        link_to_file: '',
        student_id: 0,
        time: Date.now() - 4000,
    },
];

export const classSolutionsMock: IclassSolutionsMock = {
    0: [solutionsMock[0]],

    1: [solutionsMock[1], solutionsMock[2], solutionsMock[3]],
};
