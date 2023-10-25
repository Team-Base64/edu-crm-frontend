import { MessageEvent, WebSocketServer } from 'ws';
import { ChatMessage } from '../src/components/Messenger/Messenger';
import { Channel } from '../src/app/services/api';

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
        id: 1,
    },
    {
        isMine: true,
        text: '',
        time: '18:10',
        authorAvatarSrc: man_photo_src,
        channel: 'chat',
        id: 2,
    },
];

webSocketServer.on('connection', (socket) => {
    socket.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data.toString());
        console.log('Received a message from the client: ', data);
    };

    const message = messages[0];

    setInterval(() => {
        message.isMine = false;
        message.time = new Date().getTime().toString();
        message.text = `hello! me: ${Math.random() > 0.5}`;
        message.id = Number(
            new Date().getTime().toString().at(-1) ?? Math.random(),
        );
        socket.send(JSON.stringify(message));
    }, 5000);
});

console.log('starting sw server mock');
