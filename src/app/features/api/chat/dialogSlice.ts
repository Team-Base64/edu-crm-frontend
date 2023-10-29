import { apiSlice } from '../apiSlice.ts';
import { apiPaths } from '../../../consts.ts';

export type dialogSelectType = {
    chatid: number;
    name: string;
    cover: string;
    isread: boolean;
    lastmessage: {
        text: string;
        date: string;
    };
};
export const dialogApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getChats: build.query<{ chats: dialogSelectType[] }, unknown>({
            query: () => ({ url: apiPaths.chats, method: 'GET' }),
        }),
    }),
});

export const { useGetChatsQuery } = dialogApi;
