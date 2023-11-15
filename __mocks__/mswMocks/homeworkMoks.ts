import { http, HttpResponse } from 'msw';
import appPaths from '../../src/app/appPaths';

import { defaultHeadersMock } from '../const/constMocks';

import { homeworksMock } from '../const/homeworkConstMocks';

export const homeworkHandlers = [
    // create homework
    http.post(`${appPaths.basePath}${appPaths.homeworkCreate}`, async () => {
        try {
            return HttpResponse.json(
                {
                    homework: homeworksMock[0],
                },
                {
                    status: 200,
                    headers: { ...defaultHeadersMock },
                },
            );
        } catch (e) {
            console.log(e);
            return HttpResponse.json(
                {},
                {
                    status: 500,
                    headers: { ...defaultHeadersMock },
                },
            );
        }
    }),
    // Get homework
    http.get(
        `${appPaths.basePath}${appPaths.homework(':id')}`,
        ({ params }) => {
            const { id } = params;
            try {
                return HttpResponse.json(
                    {
                        homework: homeworksMock[Number(id)],
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
