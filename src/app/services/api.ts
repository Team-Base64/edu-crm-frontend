import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ChatMessage } from '@components/Messenger/Messenger.tsx';

const man_photo_src = 'https://flirtic.com/media/photos/1/e/7/1e733948480.jpg';

export type Channel = 'general' | 'chat';

type messageWS = {
    channel: Channel;
    chatid: number;
};

type chatType = {
    chatid: number;
};

let ws: WebSocket | null = null;
const getSocket = () => {
    if (!ws) {
        ws = new WebSocket('ws://' + '127.0.0.1:8081' + `/ws`);
    }
    return ws;
};

const resetSocket = () => {
    ws = null;
};
export const chatApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/',
        mode: 'no-cors',
    }),
    tagTypes: ['ChatMessage'],
    refetchOnFocus: true,
    refetchOnReconnect: true,
    endpoints: (build) => ({
        getMessages: build.query<{ messages: ChatMessage[] }, messageWS>({
            queryFn() {
                return { data: { messages: [] } };
            },
            // transformResponse
            // providesTags: ['ChatMessage'],
            async onCacheEntryAdded(
                { channel, chatid },
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
            ) {
                const socket = getSocket();
                // create a websocket connection when the cache subscription starts
                try {
                    // wait for the initial query to resolve before proceeding
                    await cacheDataLoaded;

                    // when data is received from the socket connection to the server,
                    // if it is a message and for the appropriate channel,
                    // update our query result with the received message

                    // socket.onopen = () => {
                    //     console.log('open, channel: ', channel);
                    // };

                    socket.onmessage = (event: MessageEvent) => {
                        const data = JSON.parse(event.data);
                        if (
                            data.channel !== channel &&
                            data.message.chatid !== chatid
                        ) {
                            return;
                        }

                        updateCachedData((draft) => {
                            data.authorAvatarSrc = man_photo_src;
                            draft.messages.push(data);
                        });
                    };
                } catch {
                    console.error('error sw');
                    // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
                    // in which case `cacheDataLoaded` will throw
                }
                // cacheEntryRemoved will resolve when the cache subscription is no longer active
                await cacheEntryRemoved;
                // perform cleanup steps once the `cacheEntryRemoved` promise resolves
                socket.onclose = resetSocket;
                socket.close();
            },
        }),
        // sendMessage: build.mutation<unknown, { message: ChatMessage }>({
        sendMessage: build.mutation<
            unknown,
            { message: { text: string; chatid: number } }
        >({
            query({ message }) {
                const socket = getSocket();
                socket.send(JSON.stringify(message));
                return JSON.stringify({ message });
            },
            // invalidatesTags: ['ChatMessage'],
        }),
        getChats: build.query<{ chats: chatType[] }, unknown>({
            query: () => ({ url: 'chats', method: 'GET' }),
            // providesTags: ['ChatMessage'],
            async onCacheEntryAdded(
                _,
                {
                    updateCachedData,
                    cacheDataLoaded,
                    getState,
                    cacheEntryRemoved,
                },
            ) {
                try {
                    // wait for the initial query to resolve before proceeding
                    await cacheDataLoaded;

                    console.log(getState);

                    updateCachedData(() => {
                        // console.log(getState);
                        // draft.messages.push(data);
                    });
                } catch {
                    console.error('error sw');
                    // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
                    // in which case `cacheDataLoaded` will throw
                }
                // cacheEntryRemoved will resolve when the cache subscription is no longer active
                await cacheEntryRemoved;
                // perform cleanup steps once the `cacheEntryRemoved` promise resolves
            },
        }),
    }),
});

export const {
    useGetMessagesQuery,
    useSendMessageMutation,
    useGetChatsQuery,
    util,
} = chatApi;
