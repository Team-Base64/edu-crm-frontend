import { WebSocketServer } from 'ws';
import { ChatMessage } from '../src/components/Messenger/Messenger';

const webSocketServer = new WebSocketServer({
    port: 8081,
});

const man_photo_src = 'https://flirtic.com/media/photos/1/e/7/1e733948480.jpg';

const messages: ChatMessage[] = [
    {
        isMine: false,
        text: '',
        time: '18:09',
        authorAvatarSrc: man_photo_src,
    },
    {
        isMine: true,
        text: '',
        time: '18:10',
        authorAvatarSrc: man_photo_src,
    },
];

webSocketServer.on('connection', (socket) => {
    socket.on('message', (message) => {
        console.log('Received a message from the client', message);
    });

    // messages.forEach((message) => {
    //     socket.send(JSON.stringify(message));
    // });

    const message = messages[0];
    message.id = 0;

    setInterval(() => {
        message.isMine = Math.random() > 0.5;
        message.time = new Date().getTime().toString();
        message.text = `hello! me: ${message.isMine}`;
        socket.send(JSON.stringify(message));
    }, 3000);
});

console.log('starting sw server mock');
