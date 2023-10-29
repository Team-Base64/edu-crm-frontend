import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiPaths } from '../../consts.ts';

export type Channel = 'general' | 'chat';

let ws: WebSocket | null = null;
export const getSocket = () => {
    if (!ws || !ws.OPEN) {
        ws = new WebSocket('ws://' + '127.0.0.1:8081' + `/ws`);
    }
    return ws;
};

export type messageWS = {
    channel: Channel;
    chatid: number;
};

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: apiPaths.basePath,
        mode: 'cors',
    }),
    refetchOnFocus: true,
    refetchOnReconnect: true,
    // refetchOnMountOrArgChange: true,
    endpoints: () => ({}),
});
