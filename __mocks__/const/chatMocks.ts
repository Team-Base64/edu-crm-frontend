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
    },
];
