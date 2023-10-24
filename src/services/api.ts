import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ChatMessage } from '@components/Messenger/Messenger.tsx';

export type Channel = 'general' | 'chat';

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
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    tagTypes: ['ChatMessage'],
    refetchOnFocus: true,
    refetchOnReconnect: true,
    endpoints: (build) => ({
        getMessages: build.query<{ messages: ChatMessage[] }, Channel>({
            queryFn() {
                return { data: { messages: [] } };
            },
            async onCacheEntryAdded(
                channel,
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

                    socket.onopen = () => {
                        console.log('open');
                        socket.send(JSON.stringify({ status: 'conn' }));
                    };

                    socket.onmessage = (event: MessageEvent) => {
                        const data = JSON.parse(event.data);
                        if (data.channel !== channel) return;

                        updateCachedData((draft) => {
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
        sendMessage: build.mutation<unknown, { message: ChatMessage }>({
            query({ message }) {
                const socket = getSocket();
                socket.send(JSON.stringify({ message }));
                return JSON.stringify({ message });
            },
            // async onCacheEntryAdded(message, { updateCachedData, cacheDataLoaded, cacheEntryRemoved })
        }),
    }),
});

export const { useGetMessagesQuery, useSendMessageMutation } = chatApi;
