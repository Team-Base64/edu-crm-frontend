import { Announcement } from '../../src/app/features/announcement/announcementModel';

export const newAnnounceMock: Announcement = {
    id: 100,
    text: 'New announce id 100',
    createTime: new Date(Date.now()).toISOString(),
    attaches: [],
};

export const announcesMock: Announcement[] = [
    newAnnounceMock,
    newAnnounceMock,
    {
        id: 0,
        text: 'Announce for class 0 #1/1',
        createTime: new Date(Date.now() - 10000).toISOString(),
        attaches: [],
    },
    {
        id: 1,
        text: 'Announce for class 1 #1/2',
        createTime: new Date(Date.now() - 5000000).toISOString(),
        attaches: [],

    },
    {
        id: 2,
        text: 'Announce for class 1 #2/6',
        createTime: new Date(Date.now() - 10000000).toString(),
        attaches: [],

    },

    {
        id: 3,
        text: 'Announce for class 1 #3/6',
        createTime: new Date(Date.now() - 200000000).toISOString(),
        attaches: [],

    },

    {
        id: 4,
        text: 'Announce for class 1 #4/6',
        createTime: new Date(Date.now() - 30000).toISOString(),
        attaches: [],

    },

    {
        id: 5,
        text: 'Announce for class 1 #5/6',
        createTime: new Date(Date.now() - 40000000).toISOString(),
        attaches: [],

    },

    {
        id: 6,
        text: 'Announce for class 1 #6/6',
        createTime: new Date(Date.now() - 50000000).toISOString(),
        attaches: [],

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


