import { ChatMessageType } from '@components/Messenger/Messenger.tsx';
import { apiSlice, getSocket, messageWS } from '../apiSlice.ts';
import { apiPaths } from '../../../consts.ts';

const man_photo_src = 'https://flirtic.com/media/photos/1/e/7/1e733948480.jpg';

type chatMessageType = { text: string; chatid: number };

interface apiChatMessageType {
    messages: { [index: string]: ChatMessageType[] };
    wasFetched: { [index: string]: boolean };
}

export const messagesApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getLiveMessages: build.query<apiChatMessageType, messageWS>({
            query: ({ chatid }) => ({
                url: `${apiPaths.chats}/${chatid}`,
                method: 'GET',
            }),
            transformResponse(
                baseQueryReturnValue: { messages: ChatMessageType[] },
                _,
                arg,
            ) {
                const messages = {
                    [arg.chatid]: baseQueryReturnValue.messages,
                };
                const wasFetched = {
                    [arg.chatid]: true,
                };
                return { messages, wasFetched };
            },
            forceRefetch({ currentArg, previousArg, endpointState }) {
                if (
                    currentArg &&
                    previousArg &&
                    endpointState &&
                    endpointState.data instanceof Object &&
                    'wasFetched' in endpointState.data
                ) {
                    return (
                        currentArg.chatid !== previousArg.chatid &&
                        !(endpointState.data as apiChatMessageType).wasFetched[
                            currentArg.chatid
                        ]
                    );
                }
                return false;
            },
            serializeQueryArgs: (params: { queryArgs: messageWS }) =>
                `getLiveMessages-${params.queryArgs.channel}`,
            merge: (currentCache, newItems) => {
                Object.entries(newItems.messages).forEach(([key, newValue]) => {
                    console.log(newValue, newItems.messages, key);
                    currentCache.messages[key] = [
                        ...newValue,
                        ...(currentCache.messages[key] ?? []),
                    ];
                });
            },
            async onCacheEntryAdded(
                { channel },
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
            ) {
                const socket = getSocket();
                try {
                    await cacheDataLoaded;

                    socket.onmessage = (event: MessageEvent) => {
                        const data = JSON.parse(event.data);
                        if (
                            data.channel !== channel
                            // data.message.chatid !== chatid
                        ) {
                            console.warn(data.channel, channel);
                            return;
                        }

                        updateCachedData((draft) => {
                            data.authorAvatarSrc = man_photo_src;
                            draft.messages[data.chatid] = [
                                ...(draft.messages[data.chatid] ?? []),
                                data,
                            ];
                        });
                    };
                } catch {
                    console.error('error ws api');
                }
                await cacheEntryRemoved;
                socket.close();
            },
        }),
        sendMessage: build.mutation<unknown, { message: chatMessageType }>({
            queryFn: (args) => {
                const socket = getSocket();
                socket.send(JSON.stringify(args.message));
                return { data: [] };
            },
            async onQueryStarted({ message }, { dispatch /*, queryFulfilled*/ }) {
                dispatch(
                    messagesApi.util.updateQueryData(
                        'getLiveMessages',
                        { channel: 'chat', chatid: message.chatid },
                        (draft) => {
                            draft.messages[message.chatid] = [
                                ...(draft.messages[message.chatid] ?? []),
                                {
                                    date: new Date().toISOString(),
                                    // user: {
                                    //     avatar: man_photo_src,
                                    //     name: 'User store',
                                    // },
                                    ismine: true,
                                    ...message,
                                    id: 10,
                                },
                            ];
                        },
                    ),
                );
                // try {
                //     await queryFulfilled;
                // } catch {
                // patchResult.undo();
                /**
                 * Alternatively, on failure you can invalidate the corresponding cache tags
                 * to trigger a re-fetch:
                 * dispatch(api.util.invalidateTags(['Post']))
                 */
                //}
            },
        }),
    }),
});

export const { useGetLiveMessagesQuery, useSendMessageMutation } = messagesApi;
