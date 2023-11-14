import { HomeworkTask, HomeworkTaskCreatePayload } from '../../src/app/features/homeworkTask/homeworkTaskModel';
export const tasksMock: HomeworkTask[] = [
    {
        id: 1,
        description: 'Mock task bla bla bla 1',
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

