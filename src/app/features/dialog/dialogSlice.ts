import appApi from '@app/appApi.ts';
import { dialogSelectType } from '@app/features/dialog/dialogModel';
import { dialogPaths } from '@app/features/dialog/dialogPaths';

export const dialogSlice = appApi.injectEndpoints({
    endpoints: (build) => ({
        getChats: build.query<{ chats: dialogSelectType[] }, unknown>({
            query: () => {
                return {
                    url: dialogPaths.dialogs,
                    method: 'GET',
                };
            },
        }),
    }),
});

export const { useGetChatsQuery } = dialogSlice;
