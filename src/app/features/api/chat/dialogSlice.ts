import { apiSlice } from '../apiSlice.ts';
import { apiPaths } from '../../../consts.ts';

type chatType = {
    chatid: number;
};
export const dialogApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getChats: build.query<{ chats: chatType[] }, unknown>({
            query: () => ({ url: apiPaths.chats, method: 'GET' }),
        }),
    }),
});

export const { useGetChatsQuery } = dialogApi;
