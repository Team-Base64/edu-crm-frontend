import appApi from '@app/appApi.ts';

import { getSocket, messageWS } from '@app/websocket';
import {
    apiChatMessageType,
    ChatMessageType,
    postChatMessageType,
} from '@app/features/chat/chatModel';
import { chatPaths } from '@app/features/chat/chatPaths';
import { dialogSlice } from '@app/features/dialog/dialogSlice.ts';
import { data } from 'browserslist';
import { stundentSlice } from '@app/features/stundent/stundentSlice.ts';

export const chatSlice = appApi.injectEndpoints({
    endpoints: (build) => ({
        getLiveMessages: build.query<apiChatMessageType, messageWS>({
            query: ({ chatID }) => ({
                url: chatPaths.dialog(chatID),
                method: 'GET',
            }),
            transformResponse(
                baseQueryReturnValue: { messages: ChatMessageType[] },
                _,
                arg,
            ) {
                const messages = {
                    [arg.chatID]: baseQueryReturnValue.messages,
                };
                const wasFetched = {
                    [arg.chatID]: true,
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
                        currentArg.chatID !== previousArg.chatID &&
                        !(endpointState.data as apiChatMessageType).wasFetched[
                            currentArg.chatID
                        ]
                    );
                }
                return false;
            },
            serializeQueryArgs: (params: { queryArgs: messageWS }) =>
                `getLiveMessages-${params.queryArgs.channel}`,
            merge: (currentCache, newItems) => {
                Object.entries(newItems.messages).forEach(([key, newValue]) => {
                    currentCache.messages[key] = [
                        ...newValue,
                        ...(currentCache.messages[key] ?? []),
                    ];
                });
            },
            async onCacheEntryAdded(
                { channel },
                {
                    updateCachedData,
                    cacheDataLoaded,
                    cacheEntryRemoved,
                    dispatch,
                },
            ) {
                const socket = getSocket();
                try {
                    await cacheDataLoaded;

                    socket.onmessage = (event: MessageEvent) => {
                        const data = JSON.parse(event.data);

                        if (data.channel === channel) {
                            updateCachedData((draft) => {
                                draft.messages[data.chatID] = [
                                    ...(draft.messages[data.chatID] ?? []),
                                    data,
                                ];
                            });
                        }
                        dispatch(
                            dialogSlice.util.invalidateTags(['getDialogs']),
                        );
                        if (data.channel === 'newchat') {
                            dispatch(
                                stundentSlice.util.invalidateTags([
                                    'getClassStudents',
                                    'getStudent',
                                ]),
                            );
                        }
                    };
                } catch {
                    console.error('error ws api');
                }
                await cacheEntryRemoved;
                socket.close();
            },
        }),
        sendMessage: build.mutation<unknown, { message: postChatMessageType }>({
            queryFn: (args) => {
                const socket = getSocket();
                socket.send(JSON.stringify(args.message));
                return { data: [] };
            },
            invalidatesTags: ['getDialogs'],
            async onQueryStarted(
                { message },
                { dispatch /*, queryFulfilled*/ },
            ) {
                dispatch(
                    chatSlice.util.updateQueryData(
                        'getLiveMessages',
                        { channel: 'chat', chatID: message.chatID },
                        (draft) => {
                            draft.messages[message.chatID] = [
                                ...(draft.messages[message.chatID] ?? []),
                                message,
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

export const { useGetLiveMessagesQuery, useSendMessageMutation } = chatSlice;
