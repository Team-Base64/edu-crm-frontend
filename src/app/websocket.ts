import { localStoragePath } from '@app/const/consts.ts';

export type Channel = 'general' | 'chat' | 'newchat' | 'newsolution';

export type messageWS = {
    channel: Channel;
    chatID: number;
};

let ws: WebSocket | null = null;

const wsQueryLoginParamName = 'teacherLogin';

// function Singleton() {
//     return Singleton.prototype.init();
// }
// Singleton.prototype.init = function () {
// var _this = Object.create(this);
// _this.init = function () { return this; };
// return _this;
// }

// function GetSocket() {
//     return getSocket.prototype.init();
// }
// GetSocket.prototype.init = function () {
//     if (!ws || !ws.OPEN) {
//         ws = new WebSocket(
//             import.meta.env.VITE_WEBSOCKET_PATH +
//                 `?${wsQueryLoginParamName}=${localStorage.getItem(
//                     localStoragePath.login,
//                 )}`,
//         );
//     }
//     return ws;
// };

export const getSocket = () => {
    if (!ws || !ws.OPEN) {
        ws = new WebSocket(
            import.meta.env.VITE_WEBSOCKET_PATH +
                `?${wsQueryLoginParamName}=${localStorage.getItem(
                    localStoragePath.login,
                )}`,
        );
    }
    return ws;
};
