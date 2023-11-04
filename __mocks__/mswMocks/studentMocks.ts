import { http, HttpResponse } from 'msw';

import { apiPaths } from '../../src/app/consts.js';

import { defaultHeadersMock } from '../const/constMocks.ts';

import { studentsMock } from '../const/studentConstMocks.ts';

export const studentHandlers = [
    http.get(`${apiPaths.basePath}${apiPaths.student(':id')}`, ({ params }) => {
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
