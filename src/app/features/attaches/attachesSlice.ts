import appApi from '@app/appApi.ts';
import appPaths from '@app/appPaths.ts';
import { attachesPaths } from '@app/features/attaches/attachesPaths.ts';
import { attachmentsType } from '@app/features/attaches/attachesModel.ts';

export const attachesSlice = appApi.injectEndpoints({
    endpoints: (build) => ({
        sendChatAttaches: build.mutation<{ file: string }, attachmentsType>({
            query: ({ attache, type }) => {
                const formData = new FormData();
                formData.append('file', attache);

                return {
                    url: `${appPaths.baseChatPath}${attachesPaths.attach}${type}`,
                    method: 'POST',
                    body: formData,
                    formData: true,
                };
            },
        }),
    }),
});

export const { useSendChatAttachesMutation } = attachesSlice;
