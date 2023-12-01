import { Homework } from '@app/features/homework/homeworkModel.ts';
import { tasksMock } from './taskConstMocks';

interface IclassHomeworksMock {
    [key: number]: Homework[];
}

export const homeworksMock: Homework[] = [
    {
        id: 0,
        classID: 1,
        title: 'Homework #0',
        description: 'homework 0 for class 1',
        createTime: new Date(Date.now() - 10000).toISOString(),
        deadlineTime: new Date(Date.now() + 10000).toISOString(),
        tasks: tasksMock.map((t) => t.id),
    },
    {
        id: 1,
        classID: 2,
        title: 'very very vey long long long title kek lol  1',
        description: 'mock homework 1 for class 1',
        createTime: new Date(Date.now() - 10000).toISOString(),
        deadlineTime: new Date(Date.now() + 10000).toISOString(),
        tasks: tasksMock.map((t) => t.id),
    },

    {
        id: 2,
        classID: 2,
        title: 'Homework 2',
        description: 'mock homework 2 fro class 2',
        createTime: new Date(Date.now() - 5000).toISOString(),
        deadlineTime: new Date(Date.now() + 20000).toISOString(),
        tasks: tasksMock.map((t) => t.id),
    },

    {
        id: 3,
        classID: 2,
        title: 'Homework #3',
        description: 'mock homework 3 for class 2',
        createTime: new Date(Date.now() - 2000).toISOString(),
        deadlineTime: new Date(Date.now() - 100).toISOString(),
        tasks: tasksMock.map((t) => t.id),
    },
];

export const classHomeworksMock: IclassHomeworksMock = {
    0: [],
    1: [homeworksMock[0]],
    2: [homeworksMock[1], homeworksMock[2], homeworksMock[3]],
};
