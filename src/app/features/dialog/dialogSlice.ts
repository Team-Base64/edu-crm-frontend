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
            transformResponse({ dialogs }: { dialogs: dialogSelectType[] }) {
                const newDialogs: dialogSelectByIDType = {};

                dialogs.forEach((dialog) => {
                    newDialogs[dialog.chatid] = dialog;
                });

                return { dialogs: newDialogs };
            },
        }),
    }),
});

export const { useGetDialogsQuery } = dialogSlice;
