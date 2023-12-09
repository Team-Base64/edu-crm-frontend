import appApi from '@app/appApi.ts';
import {
    dialogSelectByIDType,
    dialogSelectType,
} from '@app/features/dialog/dialogModel';
import { dialogPaths } from '@app/features/dialog/dialogPaths';
import { userAvatarPlaceholder } from '@app/const/consts.ts';
import appPaths from '@app/appPaths.ts';

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
                    newDialogs[chats.chatID] = {
                        ...chats,
                        cover: chats.cover ?? userAvatarPlaceholder,
                    };
                });

                return { dialogs: newDialogs };
            },
        }),
        setIsReadDialog: build.query<unknown, { chatID: number }>({
            query: (dialogData) => {
                return {
                    url: `${appPaths.basePath}${dialogPaths.setReadDialog}${dialogData.chatID}`,
                    method: 'POST',
                };
            },
            async onQueryStarted(dialogData, { queryFulfilled, dispatch }) {
                await queryFulfilled;
                dispatch(
                    dialogSlice.util.updateQueryData(
                        'getDialogs',
                        null,
                        (draftDialogs) => {
                            draftDialogs.dialogs[dialogData.chatID] = {
                                ...draftDialogs.dialogs[dialogData.chatID],
                                isread: true,
                            };
                        },
                    ),
                );
            },
        }),
    }),
});

export const { useGetDialogsQuery, useSetIsReadDialogQuery } = dialogSlice;
