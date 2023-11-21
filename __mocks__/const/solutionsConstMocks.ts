import { HomeworkSolution } from '../../src/app/features/homeworkSolution/homeworkSolutionModel';
const attach = 'https://img.freepik.com/free-photo/beautiful-young-happy-brunette-girl-with-long-hair-posing-outdoors-street-photo-portrait-close-up_1321-50.jpg?w=996&t=st=1699021268~exp=1699021868~hmac=64ec31bcf7dd56bdd7962b0169cec1b5aa8a028e5d9677fb4348a62e78626202';
const pdf = 'https://www.vsavm.by/wp-content/uploads/2013/01/ZOOLOGIYa.pdf';
interface IclassSolutionsMock {
    [key: number]: HomeworkSolution[];
}

export const solutionsMock: HomeworkSolution[] = [
    {
        id: 0,
        hwID: 0,
        file: pdf,
        studentID: 0,
        createTime: new Date(Date.now() - 10000000).toISOString(),
        status: 'new',
        teacherEvaluation: '',
        isApproved: false,
    },
    {
        id: 111,
        hwID: 0,
        file: pdf,
        studentID: 0,
        createTime: new Date(Date.now() - 50000).toISOString(),
        status: 'new',
        teacherEvaluation: '',
        isApproved: false,

    },
    {
        id: 1,
        hwID: 1,
        file: attach,
        studentID: 1,
        createTime: new Date(Date.now() - 1000000).toISOString(),
        status: 'new',
        teacherEvaluation: '',
        isApproved: true,
    },
    {
        id: 100,
        hwID: 1,
        file: attach,
        studentID: 1,
        createTime: new Date(Date.now() - 500000).toISOString(),
        status: 'new',
        teacherEvaluation: '',
        isApproved: false,
    },
    {
        id: 2,
        hwID: 2,
        file: attach,
        studentID: 2,
        createTime: new Date(Date.now() - 5000000).toISOString(),
        status: 'new',
        teacherEvaluation: '',
        isApproved: false,
    },

    {
        id: 3,
        hwID: 1,
        file: attach,
        studentID: 0,
        createTime: new Date(Date.now() - 40000000).toISOString(),
        status: 'new',
        teacherEvaluation: '',
        isApproved: false,
    },
];

export const classSolutionsMock: IclassSolutionsMock = {
    0: [],
    1: [solutionsMock[0], solutionsMock[1]],
    2: [solutionsMock[2], solutionsMock[3], solutionsMock[4]],
};
