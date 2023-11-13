import { http, HttpResponse } from 'msw';
import appPaths from '../../src/app/appPaths';

import {
    defaultHeadersMock,
    dialogListMock,
    man_photo_src,
    messagesMock,
} from '../const/constMocks.ts';

export const chatHandlers = [
    http.get(`${appPaths.basePath}${appPaths.dialog(':id')}`, ({ params }) => {
        const { id } = params;
        return HttpResponse.json(
            { messages: [messagesMock[Number(id) === 1 ? 0 : 1]] },
            {
                status: 200,
                headers: { ...defaultHeadersMock },
            },
        );
    }),

    http.get(`${appPaths.basePath}${appPaths.dialogs}`, () =>
        HttpResponse.json(
            { chats: dialogListMock },
            { status: 200, headers: { ...defaultHeadersMock } },
        ),
    ),

    http.post(`${import.meta.env.VITE_BASE_CHAT_PATH}attach?type=chat`, () =>
        HttpResponse.json(
            { file: man_photo_src },
            {
                status: 200,
                headers: { ...defaultHeadersMock },
            },
        ),
    ),
];
