import { http, HttpResponse, passthrough } from 'msw';
import { apiPaths } from '../../src/app/consts.ts';
import {
    defaultHeadersMock,
    dialogListMock,
    messagesMock,
} from '../const/constMocks.ts';

export const chatHandlers = [
    http.get(`${apiPaths.basePath}${apiPaths.chats}/:id`, ({ params }) => {
        const { id } = params;
        return HttpResponse.json(
            { messages: [messagesMock[Number(id) === 1 ? 0 : 1]] },
            {
                status: 200,
                headers: { ...defaultHeadersMock },
            },
        );
    }),

    http.get(`${apiPaths.basePath}${apiPaths.chats}`, () =>
        HttpResponse.json(
            { chats: dialogListMock },
            { status: 200, headers: { ...defaultHeadersMock } },
        ),
    ),

];
