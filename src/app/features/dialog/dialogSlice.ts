import appApi from '@app/appApi.ts';
import {
    dialogSelectByIDType,
    dialogSelectType,
} from '@app/features/dialog/dialogModel';
import { dialogPaths } from '@app/features/dialog/dialogPaths';
import { messageWS } from '@app/websocket.ts';

export const dialogSlice = appApi.injectEndpoints({
    endpoints: (build) => ({
        getDialogs: build.query<{ dialogs: dialogSelectByIDType }, unknown>({
            query: () => {
                return {
                    url: dialogPaths.dialogs,
                    method: 'GET',
                };
            },
            providesTags: ['getDialogs'],
            transformResponse({ chats }: { chats: dialogSelectType[] }) {
                const newDialogs: dialogSelectByIDType = {};

                chats.forEach((chats) => {
                    newDialogs[chats.chatid] = chats;
                });

                return { dialogs: newDialogs };
            },
            forceRefetch() {
                // fix
                return true;
            },
        }),
    }),
});

export const { useGetDialogsQuery } = dialogSlice;
