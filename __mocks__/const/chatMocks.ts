import { ChatMessageType } from '../../src/app/features/chat/chatModel';
import { Channel } from '../../src/app/websocket';
import { middleLongTextMock } from './textMocks';
import { dialogSelectType } from '../../src/app/features/dialog/dialogModel';
import { man_photo_src } from './constMocks';

export interface netChatMessage extends ChatMessageType {
    channel: Channel;
}

export const messagesMock: netChatMessage[] = [
    {
        ismine: false,
        text: middleLongTextMock,
        date: new Date().toISOString(),
        channel: 'chat',
        chatID: 1,
        id: 1,
    },
    {
        ismine: true,
        text: 'msg 2',
        date: new Date().toISOString(),
        channel: 'chat',
        chatID: 2,
        id: 2,
    },
];

export const dialogListMock: dialogSelectType[] = [
    {
        chatID: 1,
        studentName: 'Ziko Anvo',
        cover: man_photo_src,
        isread: true,
        text: 'longask dnkasndns andkjsdjnandkasndn asndkasstring',
        date: new Date().toISOString(),
        socialType: 'tg',
        studentID: 1,
        studentAvatar:
            'https://img.freepik.com/free-photo/beautiful-young-happy-brunette-girl-with-long-hair-posing-outdoors-street-photo-portrait-close-up_1321-50.jpg?w=996&t=st=1699021268~exp=1699021868~hmac=64ec31bcf7dd56bdd7962b0169cec1b5aa8a028e5d9677fb4348a62e78626202',
    },
    {
        chatID: 2,
        studentName: 'Martha Bennet',
        cover: '',
        isread: false,
        text: 'long asndkasstring',
        date: new Date().toISOString(),
        socialType: 'vk',
        studentID: 2,
        studentAvatar:
            'https://img.freepik.com/free-photo/beautiful-young-happy-brunette-girl-with-long-hair-posing-outdoors-street-photo-portrait-close-up_1321-50.jpg?w=996&t=st=1699021268~exp=1699021868~hmac=64ec31bcf7dd56bdd7962b0169cec1b5aa8a028e5d9677fb4348a62e78626202',
    },
];
