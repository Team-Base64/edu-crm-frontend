import { ChatMessage } from '../src/components/Messenger/Messenger';
import { Channel } from '../src/app/features/api/apiSlice';

export const man_photo_src =
    'https://flirtic.com/media/photos/1/e/7/1e733948480.jpg';

export interface netChatMessage extends ChatMessage {
    channel: Channel;
}

export const messagesMock: netChatMessage[] = [
    {
        isMine: false,
        text: 'msg 1',
        time: '18:09',
        authorAvatarSrc: man_photo_src,
        channel: 'chat',
        chatid: 1,
    },
    {
        isMine: true,
        text: 'msg 2',
        time: '18:10',
        authorAvatarSrc: man_photo_src,
        channel: 'chat',
        chatid: 2,
    },
];
