import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ChatMessage } from '@components/Messenger/Messenger.tsx';

export type Channel = 'general' | 'chat';

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
                arg,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
            ) {
                // create a websocket connection when the cache subscription starts
                const ws = new WebSocket('ws://' + '127.0.0.1:8081' + `/ws`);
                try {
                    // wait for the initial query to resolve before proceeding
                    await cacheDataLoaded;

                    // when data is received from the socket connection to the server,
                    // if it is a message and for the appropriate channel,
                    // update our query result with the received message

                    ws.onopen = () => console.log('open');

                    ws.onmessage = (event: MessageEvent) => {
                        const data = JSON.parse(event.data);
                        if (data.channel !== arg) return;

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
                // ws.removeEventListener('message', listener);
                ws.close();
            },
        }),
    }),
});

export const { useGetMessagesQuery } = chatApi;
