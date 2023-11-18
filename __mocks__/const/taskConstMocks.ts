import { HomeworkTask, HomeworkTaskCreatePayload } from '../../src/app/features/homeworkTask/homeworkTaskModel';
const attach = 'https://img.freepik.com/free-photo/beautiful-young-happy-brunette-girl-with-long-hair-posing-outdoors-street-photo-portrait-close-up_1321-50.jpg?w=996&t=st=1699021268~exp=1699021868~hmac=64ec31bcf7dd56bdd7962b0169cec1b5aa8a028e5d9677fb4348a62e78626202';

export const tasksMock: HomeworkTask[] = [
    {
        id: 1,
        description: 'Mock task bla bla bla 1',
        attach: attach,
    },
    {
        id: 2,
        description: 'Mock task bla bla bla 2',
    },
    {
        id: 3,
        description: 'Mock task bla bla bla 3',
    },
];

export const newTaskMock = (payload: HomeworkTaskCreatePayload): HomeworkTask => {
    return {
        ...payload,
        id: 100,
    }
};

