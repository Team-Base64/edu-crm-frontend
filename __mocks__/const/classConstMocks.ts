import { classData, classAnnouncement, classStudent } from 'app/features/api/class/classSlice.ts';

export const classListMock: classData[] = [
    {
        id: 1,
        title: 'Mock class #1',
        description: 'Only for dev 1',
    },
    {
        id: 2,
        title: 'Mock class #2',
        description: 'Only for dev 2',
    },
];


export const classNewMock: classData = {
    id: 100,
    title: 'NEW class #100',
    description: 'NEW class desc #100',
}


interface IclassAnnouncementMock {
    [key: number]: classAnnouncement[];
}

export const classAnnouncementMock: IclassAnnouncementMock = {
    0: [
        {
            id: 0,
            text: 'Announce for class 0 #1/1',
            time: Date.now() - 10000,
        }
    ],
    1: [

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
        }
    ]
}

export const newAnnounceMock: classAnnouncement = {
    id: 100,
    text: 'New announce id 100',
    time: Date.now(),
};

interface IclassStundetsMock {
    [key: number]: classStudent[];
};

const avatarSrc = 'https://img.freepik.com/free-photo/beautiful-young-happy-brunette-girl-with-long-hair-posing-outdoors-street-photo-portrait-close-up_1321-50.jpg?w=996&t=st=1699021268~exp=1699021868~hmac=64ec31bcf7dd56bdd7962b0169cec1b5aa8a028e5d9677fb4348a62e78626202';

export const classStundetsMock: IclassStundetsMock = {
    0: [
        {
            id: 1,
            firstName: 'George',
            lastName: 'Illarionov',
            avatarSrc: avatarSrc,
        }
    ],
    1: [
        {
            id: 2,
            firstName: 'Vlad',
            lastName: 'Pinevich',
            avatarSrc: avatarSrc,

        },
        {
            id: 3,
            firstName: 'Leo',
            lastName: 'Pack',
            avatarSrc: avatarSrc,

        },
        {
            id: 4,
            firstName: 'George',
            lastName: 'Illarionov',
            avatarSrc: avatarSrc,
        }

    ]
}


