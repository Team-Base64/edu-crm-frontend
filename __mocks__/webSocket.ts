import { MessageEvent, WebSocketServer } from 'ws';
import { messagesMock } from './constMocks.ts';

const webSocketServer = new WebSocketServer({
    port: 8081,
});

webSocketServer.on('connection', (socket) => {
    socket.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data.toString());
        console.log('Received a message from the client: ', data);
    };

    const message = messagesMock[0];

    setInterval(() => {
        message.isMine = false;
        message.time = new Date().getTime().toString();
        message.text = `1 hello! me: ${Math.random() > 0.5}`;
        message.channel = `chat`;
        message.id = Number(
            new Date().getTime().toString().at(-1) ?? Math.random(),
        );
        message.chatid = 1;
        socket.send(JSON.stringify(message));
    }, 3000);
    setInterval(() => {
        message.isMine = false;
        message.time = new Date().getTime().toString();
        message.text = `2 hello! me: ${Math.random() > 0.5}`;
        message.channel = `chat`;
        message.id = Number(
            new Date().getTime().toString().at(-1) ?? Math.random(),
        );
        message.chatid = 2;
        socket.send(JSON.stringify(message));
    }, 3000);
});

console.log('starting sw server mock');
