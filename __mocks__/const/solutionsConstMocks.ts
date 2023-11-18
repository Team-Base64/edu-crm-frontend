import { HomeworkSolution } from '../../src/app/features/homeworkSolution/homeworkSolutionModel';
const attach = 'https://img.freepik.com/free-photo/beautiful-young-happy-brunette-girl-with-long-hair-posing-outdoors-street-photo-portrait-close-up_1321-50.jpg?w=996&t=st=1699021268~exp=1699021868~hmac=64ec31bcf7dd56bdd7962b0169cec1b5aa8a028e5d9677fb4348a62e78626202';

interface IclassSolutionsMock {
    [key: number]: HomeworkSolution[];
}

export const solutionsMock: HomeworkSolution[] = [
    {
        id: 0,
        hwID: 0,
        file: attach,
        studentID: 0,
        createTime: new Date(Date.now() - 1000).toISOString(),
    },
    {
        id: 1,
        hwID: 1,
        file: attach,
        studentID: 1,
        createTime: new Date(Date.now() - 1000).toISOString(),
    },
    {
        id: 2,
        hwID: 2,
        file: attach,
        studentID: 2,
        createTime: new Date(Date.now() - 500).toISOString(),
    },

    {
        id: 3,
        hwID: 1,
        file: attach,
        studentID: 0,
        createTime: new Date(Date.now() - 4000).toISOString(),
    },
];

export const classSolutionsMock: IclassSolutionsMock = {
    0: [],
    1: [solutionsMock[0]],

    2: [solutionsMock[1], solutionsMock[2], solutionsMock[3]],
};
