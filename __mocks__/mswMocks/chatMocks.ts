import { http, HttpResponse, passthrough } from 'msw';
import { apiPaths } from '../../src/app/consts.ts';
import { messagesMock } from '../constMocks.ts';

const defaultHeaders = {
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, accept, csrf',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Origin': 'http://127.0.0.1:8001/',
};

export const chatHandlers = [
    http.get(`${apiPaths.basePath}${apiPaths.chats}:id`, ({ params }) => {
        const { id } = params;
        return HttpResponse.json(
            { messages: [messagesMock[Number(id) === 1 ? 0 : 1]] },
            {
                status: 200,
                headers: { ...defaultHeaders },
            },
        );
    }),

    http.get(apiPaths.basePath + apiPaths.chats, () =>
        HttpResponse.json(
            { chats: [{ chatid: 1 }, { chatid: 2 }] },
            { status: 200, headers: { ...defaultHeaders } },
        ),
    ),

    http.get('https://flirtic.com/media/photos/*', () => passthrough()),

    http.get('/src/*', () => passthrough()),
];
