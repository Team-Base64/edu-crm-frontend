import { http, HttpResponse } from 'msw';
import appPaths from '../../src/app/appPaths';
import { defaultHeadersMock } from '../const/constMocks.ts';

export const reviewHandlers = [
    http.put(`${appPaths.basePath}${appPaths.createReview(':id')}`, () => {
        try {
            return HttpResponse.json(
                {},
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
