import {
    Homework,
    HomeworkCreatePayload,
} from '../../src/app/features/homework/homeworkModel';

interface IclassHomeworksMock {
    [key: number]: Homework[];
}

export const homeworksMock: Homework[] = [
    {
        id: 0,
        class_id: 0,
        title: 'HomeworkModel 0',
        description: 'mock homework 0',
        create_time: Date.now() - 10000,
        deadline_time: Date.now() + 10000,
        link_to_file: '',
    },
    {
        id: 1,
        class_id: 1,
        title: 'HomeworkModel very very vey long long long title kek lol  1',
        description: 'mock homework 1',
        create_time: Date.now() - 10000,
        deadline_time: Date.now() + 10000,
        link_to_file: '',
    },

    {
        id: 2,
        class_id: 1,
        title: 'HomeworkModel 2',
        description: 'mock homework 2',
        create_time: Date.now() - 5000,
        deadline_time: Date.now() + 20000,
        link_to_file: '',
    },

    {
        id: 3,
        class_id: 1,
        title: 'HomeworkModel 3',
        description: 'mock homework 3',
        create_time: Date.now() - 2000,
        deadline_time: Date.now() - 100,
        link_to_file: '',
    },
];

export const classHomeworksMock: IclassHomeworksMock = {
    0: [homeworksMock[0]],

    1: [homeworksMock[1], homeworksMock[2], homeworksMock[3]],
};

export const newHomeworkMock = (
    class_id: string | number,
    payload: HomeworkCreatePayload,
): Homework => {
    return {
        ...payload,
        id: 1000,
        create_time: Date.now(),
        class_id: class_id,
        link_to_file: '',
    };
};
