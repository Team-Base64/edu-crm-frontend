import { http, HttpResponse } from 'msw';
import apiPaths from '../../src/app/apiPaths';

import { defaultHeadersMock } from '../const/constMocks';

import { homeworksMock } from '../const/homeworkConstMocks';

export const homeworkHandlers = [
    // Get homework
    http.get(
        `${apiPaths.basePath}${apiPaths.homework(':id')}`,
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
