import {
    Homework,
    HomeworkCreatePayload,
} from '@app/features/homework/homeworkModel.ts';

interface IclassHomeworksMock {
    [key: number]: Homework[];
}

export const homeworksMock: Homework[] = [
    {
        id: 0,
        classID: 0,
        title: 'HomeworkModel 0',
        description: 'mock homework 0',
        createTime: new Date(Date.now() - 10000).toISOString(),
        deadlineTime: new Date(Date.now() + 10000).toISOString(),
        file: '',
    },
    {
        id: 1,
        classID: 1,
        title: 'HomeworkModel very very vey long long long title kek lol  1',
        description: 'mock homework 1',
        createTime: new Date(Date.now() - 10000).toISOString(),
        deadlineTime: new Date(Date.now() + 10000).toISOString(),
        file: '',
    },

    {
        id: 2,
        classID: 1,
        title: 'HomeworkModel 2',
        description: 'mock homework 2',
        createTime: new Date(Date.now() - 5000).toISOString(),
        deadlineTime: new Date(Date.now() + 20000).toISOString(),
        file: '',
    },

    {
        id: 3,
        classID: 1,
        title: 'HomeworkModel 3',
        description: 'mock homework 3',
        createTime: new Date(Date.now() - 2000).toISOString(),
        deadlineTime: new Date(Date.now() - 100).toISOString(),
        file: '',
    },
];

export const classHomeworksMock: IclassHomeworksMock = {
    0: [],
    1: [homeworksMock[0]],

    2: [homeworksMock[1], homeworksMock[2], homeworksMock[3]],
};

export const newHomeworkMock = (
    payload: HomeworkCreatePayload,
): Homework => {
    const { title, description, classID, deadlineTime } = payload;
    return {
        id: 1000,
        title: title,
        description: description,
        classID: classID,
        createTime: new Date(Date.now()).toISOString(),
        deadlineTime: new Date(Date.parse(deadlineTime)).toISOString(),
        file: '',
    };
};
