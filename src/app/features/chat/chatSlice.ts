import appApi from '@app/appApi.ts';

import { getSocket, messageWS } from '@app/websocket';
import {
    apiChatMessageType,
    attachmentsType,
    ChatMessageType,
    postChatMessageType,
} from '@app/features/chat/chatModel';
import { chatPaths } from '@app/features/chat/chatPaths';
import appPaths from '@app/appPaths.ts';

const man_photo_src = 'https://flirtic.com/media/photos/1/e/7/1e733948480.jpg';

export const chatSlice = appApi.injectEndpoints({
    endpoints: (build) => ({
        getLiveMessages: build.query<apiChatMessageType, messageWS>({
            query: ({ chatid }) => ({
                url: chatPaths.dialog(chatid),
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
                        if (data.channel !== channel) {
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
        sendMessage: build.mutation<unknown, { message: postChatMessageType }>({
            queryFn: (args) => {
                const socket = getSocket();
                args.message.chatID;
                args.message.socialType;
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
                        { channel: 'chat', chatid: message.chatID },
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
        sendChatAttaches: build.mutation<{ file: string }, attachmentsType>({
            query: ({ attache, type }) => {
                const formData = new FormData();
                formData.append('file', attache);

                return {
                    url: `${appPaths.baseChatPath}${chatPaths.attach}${type}`,
                    method: 'POST',
                    body: formData,
                    formData: true,
                };
            },
        }),
    }),
});

export const {
    useGetLiveMessagesQuery,
    useSendMessageMutation,
    useSendChatAttachesMutation,
} = chatSlice;
