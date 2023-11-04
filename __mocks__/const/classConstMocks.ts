import { ClassData } from 'app/features/models';

export const classListMock: ClassData[] = [
    {
        id: 1,
        title: 'Mock class #1',
        description: 'Only for dev 1',
        invite_token: 'mgekl',
    },
    {
        id: 2,
        title: 'Mock class #2',
        description: 'Only for dev 2',
        invite_token: 'dawbdl',
    },
];

export const classNewMock: ClassData = {
    id: 100,
    title: 'NEW class #100',
    description: 'NEW class desc #100',
    invite_token: '32647374',
};
