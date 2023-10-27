import { ChatMessage } from '@components/Messenger/Messenger.tsx';
import { apiSlice, getSocket, messageWS } from '../apiSlice.ts';
import { apiPaths } from '../../../consts.ts';

const man_photo_src = 'https://flirtic.com/media/photos/1/e/7/1e733948480.jpg';

export const messagesApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getLiveMessages: build.query<{ messages: ChatMessage[] }, messageWS>({
            query: ({ chatid }) => ({
                url: `${apiPaths.chats}${chatid}`,
                method: 'GET',
            }),
            // transformResponse
            providesTags: ['ChatMessage'],
            async onCacheEntryAdded(
                { channel, chatid },
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
                            console.warn(data.channel, channel, chatid);
                            return;
                        }

                        updateCachedData((draft) => {
                            data.authorAvatarSrc = man_photo_src;
                            draft.messages.push(data);
                        });
                    };
                } catch {
                    console.error('error sw');
                }
                await cacheEntryRemoved;
                socket.close();
            },
        }),
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
    }),
});

export const { useGetLiveMessagesQuery, useSendMessageMutation } = messagesApi;
