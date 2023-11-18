import appApi from '@app/appApi.ts';
import {
    dialogSelectByIDType,
    dialogSelectType,
} from '@app/features/dialog/dialogModel';
import { dialogPaths } from '@app/features/dialog/dialogPaths';

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
                    newDialogs[chats.chatID] = chats;
                });

                return { dialogs: newDialogs };
            },
        }),
    }),
});

export const { useGetDialogsQuery } = dialogSlice;
