import { http, HttpResponse } from 'msw';

import appPaths from '../../src/app/appPaths';

import { defaultHeadersMock } from '../const/constMocks.ts';

import {solutionsMock} from '../const/solutionsConstMocks.ts';

export const solutionsHandlers = [
    http.get(`${appPaths.basePath}${appPaths.solution(':id')}`, ({ params }) => {
        const { id } = params;

        try {
            return HttpResponse.json(
                {
                    ...solutionsMock.at(Number(id) - 1),
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
