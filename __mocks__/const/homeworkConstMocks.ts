import {
    Homework,
    HomeworkCreatePayload,
    HomeworkTask,
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
        createTime: Date.now() - 10000,
        deadlineTime: Date.now() + 10000,
        file: '',
    },
    {
        id: 1,
        classID: 1,
        title: 'HomeworkModel very very vey long long long title kek lol  1',
        description: 'mock homework 1',
        createTime: Date.now() - 10000,
        deadlineTime: Date.now() + 10000,
        file: '',
    },

    {
        id: 2,
        classID: 1,
        title: 'HomeworkModel 2',
        description: 'mock homework 2',
        createTime: Date.now() - 5000,
        deadlineTime: Date.now() + 20000,
        file: '',
    },

    {
        id: 3,
        classID: 1,
        title: 'HomeworkModel 3',
        description: 'mock homework 3',
        createTime: Date.now() - 2000,
        deadlineTime: Date.now() - 100,
        file: '',
    },
];

export const classHomeworksMock: IclassHomeworksMock = {
    0: [],
    1: [homeworksMock[0]],

    2: [homeworksMock[1], homeworksMock[2], homeworksMock[3]],
};

export const newHomeworkMock = (
    class_id: string | number,
    payload: HomeworkCreatePayload,
): {
    classID: number;
    deadlineTime: string;
    file: string;
    createTime: number;
    description: string;
    id: number;
    title: string;
    tasks: HomeworkTask[];
} => {
    return {
        ...payload,
        id: 1000,
        createTime: Date.now(),
        classID: Number(class_id),
        file: '',
        deadlineTime: '',
    };
};
