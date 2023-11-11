import { Announcement } from '../../src/app/features/announcement/announcementModel';

export const newAnnounceMock: Announcement = {
    id: 100,
    text: 'New announce id 100',
    createTime: Date.now(),
};

export const announcesMock: Announcement[] = [
    newAnnounceMock,
    {
        id: 0,
        text: 'Announce for class 0 #1/1',
        createTime: Date.now() - 10000,
    },
    {
        id: 1,
        text: 'Announce for class 1 #1/2',
        createTime: Date.now() - 5000,
    },
    {
        id: 2,
        text: 'Announce for class 1 #2/6',
        createTime: Date.now() - 10000,
    },

    {
        id: 3,
        text: 'Announce for class 1 #3/6',
        createTime: Date.now() - 20000,
    },

    {
        id: 4,
        text: 'Announce for class 1 #4/6',
        createTime: Date.now() - 30000,
    },

    {
        id: 5,
        text: 'Announce for class 1 #5/6',
        createTime: Date.now() - 40000,
    },

    {
        id: 6,
        text: 'Announce for class 1 #6/6',
        createTime: Date.now() - 50000,
    },
];

interface IclassAnnouncementMock {
    [key: number]: Announcement[];
}

export const classAnnouncementsMock: IclassAnnouncementMock = {
    0: [],
    1: [announcesMock[1]],

    2: announcesMock.slice(1),
};


