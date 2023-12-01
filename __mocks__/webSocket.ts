import { MessageEvent, WebSocketServer } from 'ws';

const webSocketServer = new WebSocketServer({
    port: 8081,
});

webSocketServer.on('connection', (socket) => {
    socket.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data.toString());
        console.log('Received a message from the client: ', data);
    };

    const message = {
        ismine: false,
        text: 'asjdindoasndioandaoin ter ioandoi as odniond asndinasdia ansdnasndioas oasndio',
        date: new Date().toISOString(),
        channel: 'chat',
        chatID: 1,
        id: 1,
    };

    setInterval(() => {
        message.ismine = false;
        message.date = new Date().toISOString();
        message.text = `1 hello! me: ${Math.random() > 0.5}`;
        message.channel = `chat`;
        message.id = Number(
            new Date().getTime().toString().at(-1) ?? Math.random(),
        );
        message.chatID = 1;
        socket.send(JSON.stringify(message));
    }, 3000);
    setInterval(() => {
        message.ismine = false;
        message.date = new Date().toISOString();
        message.text = `2 hello! me: ${Math.random() > 0.5}`;
        message.channel = `chat`;
        message.id = Number(
            new Date().getTime().toString().at(-1) ?? Math.random(),
        );
        message.chatID = 2;
        socket.send(JSON.stringify(message));
    }, 3000);
});

console.log('starting sw server mock');
