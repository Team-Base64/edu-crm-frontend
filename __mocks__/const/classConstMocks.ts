import { ClassData } from '../../src/app/features/class/classModel';

export const classNewMock: ClassData = {
    id: 0,
    title: 'NEW class #100',
    description: 'NEW class desc #100',
    inviteToken: '32647374',
};

export const classListMock: ClassData[] = [
    classNewMock,
    {
        id: 1,
        title: 'Mock class #1',
        description: 'Only for dev 1',
        inviteToken: 'mgekl',
    },
    {
        id: 2,
        title: 'Mock class #2',
        description: 'Only for dev 2',
        inviteToken: 'dawbdl',
    },

];
