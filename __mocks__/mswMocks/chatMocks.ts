import { http, HttpResponse } from 'msw';
import appPaths from '../../src/app/appPaths';

import {
    defaultHeadersMock,
    dialogListMock,
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
            { dialogs: dialogListMock },
            { status: 200, headers: { ...defaultHeadersMock } },
        ),
    ),
];
