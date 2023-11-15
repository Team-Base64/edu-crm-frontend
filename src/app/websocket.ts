export type Channel = 'general' | 'chat';

export type messageWS = {
    channel: Channel;
    chatid: number;
};

let ws: WebSocket | null = null;

export const getSocket = () => {
    if (!ws || !ws.OPEN) {
        ws = new WebSocket(import.meta.env.VITE_WEBSOCKET_PATH);
    }
    return ws;
};
