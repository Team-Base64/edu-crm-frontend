export type Channel = 'general' | 'chat';

export type messageWS = {
    channel: Channel;
    chatid: number;
};

let ws: WebSocket | null = null;

export const getSocket = () => {
    if (!ws || !ws.OPEN) {
        ws = new WebSocket('ws://' + '127.0.0.1:8081/apichat' + `/ws`);
    }
    return ws;
};
