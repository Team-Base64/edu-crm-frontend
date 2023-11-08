import { http, HttpResponse } from 'msw';

import appPaths from '../../src/app/appPaths';

import { defaultHeadersMock } from '../const/constMocks.ts';

import { studentsMock } from '../const/studentConstMocks.ts';

export const studentHandlers = [
    http.get(`${appPaths.basePath}${appPaths.student(':id')}`, ({ params }) => {
        const { id } = params;

        try {
            return HttpResponse.json(
                {
                    student: studentsMock[Number(id)],
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
