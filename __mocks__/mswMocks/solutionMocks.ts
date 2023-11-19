import { http, HttpResponse } from 'msw';

import appPaths from '../../src/app/appPaths';

import { defaultHeadersMock } from '../const/constMocks.ts';

import {classSolutionsMock, solutionsMock} from '../const/solutionsConstMocks.ts';

export const solutionsHandlers = [
    http.get(`${appPaths.basePath}${appPaths.solution(':id')}`, ({ params }) => {
        const id  = Number(params.id);

        try {
            return HttpResponse.json(
                {
                    ...solutionsMock.filter(i => i.id === id)[0],
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

    // Get class solutions
    http.get(
        `${appPaths.basePath}${appPaths.classSolutions(':id')}`,
        ({ params }) => {
            const id = Number(params.id);
            try {
                return HttpResponse.json(
                    {
                        solutions: classSolutionsMock[id],
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
