import { http, HttpHandler, HttpResponse } from 'msw';
import appPaths from '../../src/app/appPaths';

import { defaultHeadersMock } from '../const/constMocks';
import { teacherConstMock } from '../const/teacherConstMock';

export const teacherHandlers: HttpHandler[] = [
    // Get current teacher
    http.post(`${appPaths.basePath}${appPaths.login}`, async ({ request }) => {
        try {
            const data: any = await request.json();
            if (!data.username || String(data.password) !== String(123)) {
                throw Error();
            }
            return HttpResponse.json(
                {
                    me: teacherConstMock,
                },
                {
                    status: 200,
                    headers: { ...defaultHeadersMock },
                },
            );
        } catch (e) {
            return HttpResponse.json(
                {},
                {
                    status: 404,
                    headers: { ...defaultHeadersMock },
                },
            );
        }
    }),
];
