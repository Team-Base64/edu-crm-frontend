import { Student } from '../../src/app/features/stundent/stundentModel';

const avatarSrc =
    'https://img.freepik.com/free-photo/beautiful-young-happy-brunette-girl-with-long-hair-posing-outdoors-street-photo-portrait-close-up_1321-50.jpg?w=996&t=st=1699021268~exp=1699021868~hmac=64ec31bcf7dd56bdd7962b0169cec1b5aa8a028e5d9677fb4348a62e78626202';

export const studentsMock: Student[] = [
    {
        id: 0,
        name: 'George Illarionov',
        avatarSrc: avatarSrc,
        social_network: 'tg',
    },
    {
        id: 1,
        name: 'Vlad Pinevich',
        avatarSrc: avatarSrc,
        social_network: 'vk',
    },
    {
        id: 2,
        name: 'Leo Pak',
        avatarSrc: avatarSrc,
        social_network: 'tg',
    },
    {
        id: 3,
        name: 'George Illarionov',
        avatarSrc: avatarSrc,
        social_network: 'vk',
    },
];

interface IClassStudentsMock {
    [key: number]: Student[];
}

export const classStudentsMock: IClassStudentsMock = {
    0: [studentsMock[0]],

    1: [studentsMock[0], studentsMock[1], studentsMock[2], studentsMock[3]],
};
