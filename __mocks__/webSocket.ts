import { MessageEvent, WebSocketServer } from 'ws';
import { ChatMessage } from '../src/components/Messenger/Messenger';
import { Channel } from '../src/services/chat';

const webSocketServer = new WebSocketServer({
    port: 8081,
});

const man_photo_src = 'https://flirtic.com/media/photos/1/e/7/1e733948480.jpg';

interface netChatMessage extends ChatMessage {
    channel: Channel;
}

const messages: netChatMessage[] = [
    {
        isMine: false,
        text: '',
        time: '18:09',
        authorAvatarSrc: man_photo_src,
        channel: 'chat',
    },
    {
        isMine: true,
        text: '',
        time: '18:10',
        authorAvatarSrc: man_photo_src,
        channel: 'chat',
    },
];

webSocketServer.on('connection', (socket) => {
    socket.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data.toString());
        console.log('Received a message from the client: ', data);
    };

    const message = messages[0];

    setInterval(() => {
        message.isMine = Math.random() > 0.5;
        message.time = new Date().getTime().toString();
        message.text = `hello! me: ${message.isMine}`;
        socket.send(JSON.stringify(message));
    }, 10000);
});

console.log('starting sw server mock');
