import { http, HttpResponse } from 'msw';
import appPaths from '../../src/app/appPaths';

import { defaultHeadersMock } from '../const/constMocks';

import { homeworksMock } from '../const/homeworkConstMocks';

export const homeworkHandlers = [
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
