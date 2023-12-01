import { http, HttpResponse } from 'msw';
import appPaths from '../../src/app/appPaths';

import { defaultHeadersMock, man_photo_src } from '../const/constMocks.ts';
import { dialogListMock, messagesMock } from '../const/chatMocks.ts';

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

    http.post(`${appPaths.basePath}attach?type=chat`, () =>
        HttpResponse.json(
            { file: man_photo_src },
            {
                status: 200,
                headers: { ...defaultHeadersMock },
            },
        ),
    ),
];
