import { apiSlice } from '../apiSlice.ts';
import { apiPaths } from '../../../consts.ts';

export type dialogSelectType = {
    chatid: number;
    name: string;
    cover: string;
    isread: boolean;
    text: string;
    date: string;
};

export interface dialogSelectByIDType {
    [index: number]: dialogSelectType;
}

export const dialogApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getChats: build.query<
            { chats: dialogSelectByIDType },
            // { chats: dialogSelectType[] },
            unknown
        >({
            query: () => ({ url: apiPaths.chats, method: 'GET' }),
            transformResponse({ chats }: { chats: dialogSelectType[] }) {
                const newChats: dialogSelectByIDType = {};

                chats.forEach((chat) => {
                    newChats[chat.chatid] = chat;
                });

                return { chats: newChats };
            },
        }),
    }),
});

export const { useGetChatsQuery } = dialogApi;
