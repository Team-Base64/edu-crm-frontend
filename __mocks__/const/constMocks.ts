import { Channel } from 'app/websocket';
import { middleLongTextMock } from './textMocks.ts';
import { ChatMessageType } from '../../src/app/features/chat/chatModel';
import { dialogSelectType } from '../../src/app/features/dialog/dialogModel';

export const defaultHeadersMock = {
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, accept, csrf',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Origin': 'http://127.0.0.1:8001/',
};
export const man_photo_src =
    'https://flirtic.com/media/photos/1/e/7/1e733948480.jpg';

export interface netChatMessage extends ChatMessageType {
    channel: Channel;
}

export const messagesMock: netChatMessage[] = [
    {
        ismine: false,
        text: middleLongTextMock,
        date: new Date().toISOString(),
        channel: 'chat',
        chatid: 1,
        id: 1,
    },
    {
        ismine: true,
        text: 'msg 2',
        date: new Date().toISOString(),
        channel: 'chat',
        chatid: 2,
        id: 2,
    },
];

export const dialogListMock: dialogSelectType[] = [
    {
        chatid: 1,
        name: 'Ziko Anvo',
        cover: man_photo_src,
        isread: true,
        text: 'longask dnkasndns andkjsdjnandkasndn asndkasstring',
        date: new Date().toISOString(),
        socialtype: 'tg',
    },
    {
        chatid: 2,
        name: 'Martha Bennet',
        cover: man_photo_src,
        isread: false,
        text: 'long asndkasstring',
        date: new Date().toISOString(),
        socialtype: 'vk',
    },
];
