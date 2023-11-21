import { http, HttpResponse } from 'msw';
import appPaths from '../../src/app/appPaths';

import { defaultHeadersMock } from '../const/constMocks';

import { classHomeworksMock, homeworksMock } from '../const/homeworkConstMocks';
import {
    Homework,
    HomeworkCreatePayload,
} from '@app/features/homework/homeworkModel';

export const homeworkHandlers = [
    // create homework
    http.post<any, HomeworkCreatePayload>(
        `${appPaths.basePath}${appPaths.homeworkCreate}`,
        async (info) => {
            try {
                const payload = await info.request.json();
                const hwN: Homework = {
                    ...payload,
                    id: Date.now(),
                    createTime: new Date(Date.now()).toISOString(),
                };
                homeworksMock.push(hwN);
                classHomeworksMock[payload.classID].push(hwN);
                return HttpResponse.json(
                    {
                        homework: hwN,
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
                        status: 500,
                        headers: { ...defaultHeadersMock },
                    },
                );
            }
        },
    ),
    // Get homework
    http.get(
        `${appPaths.basePath}${appPaths.homework(':id')}`,
        ({ params }) => {
            const id = Number(params.id);
            try {
                return HttpResponse.json(
                    {
                        homework: homeworksMock[id],
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
    // Get class homeworks
    http.get(
        `${appPaths.basePath}${appPaths.classHomeworks(':id')}`,
        ({ params }) => {
            const id = Number(params.id);
            try {
                return HttpResponse.json(
                    {
                        homeworks: classHomeworksMock[id],
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
