import { Announcement } from '../../src/app/features/announcement/announcementModel';

export const announcesMock: Announcement[] = [
    {
        id: 0,
        text: 'Announce for class 0 #1/1',
        time: Date.now() - 10000,
    },
    {
        id: 1,
        text: 'Announce for class 1 #1/2',
        time: Date.now() - 5000,
    },
    {
        id: 2,
        text: 'Announce for class 1 #2/6',
        time: Date.now() - 10000,
    },

    {
        id: 3,
        text: 'Announce for class 1 #3/6',
        time: Date.now() - 20000,
    },

    {
        id: 4,
        text: 'Announce for class 1 #4/6',
        time: Date.now() - 30000,
    },

    {
        id: 5,
        text: 'Announce for class 1 #5/6',
        time: Date.now() - 40000,
    },

    {
        id: 6,
        text: 'Announce for class 1 #6/6',
        time: Date.now() - 50000,
    },
];

interface IclassAnnouncementMock {
    [key: number]: Announcement[];
}

export const classAnnouncementsMock: IclassAnnouncementMock = {
    0: [announcesMock[0]],

    1: announcesMock.slice(1),
};

export const newAnnounceMock: Announcement = {
    id: 100,
    text: 'New announce id 100',
    time: Date.now(),
};
