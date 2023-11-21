import { http, HttpResponse } from 'msw';

import appPaths from '../../src/app/appPaths';

import { defaultHeadersMock } from '../const/constMocks.ts';

import { classStudentsMock, studentsMock } from '../const/studentConstMocks.ts';

export const studentHandlers = [
    http.get(`${appPaths.basePath}${appPaths.student(':id')}`, ({ params }) => {
        const id = Number(params.id);

        try {
            return HttpResponse.json(
                {
                    student: studentsMock[id],
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

    // Get class users
    http.get(
        `${appPaths.basePath}${appPaths.classStudents(':id')}`,
        ({ params }) => {
            const id = Number(params.id);
            try {
                return HttpResponse.json(
                    {
                        students: classStudentsMock[id],
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
        },
    ),
];
