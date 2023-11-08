import { http, HttpResponse } from 'msw';

import appPaths from '../../src/app/appPaths';

import { defaultHeadersMock } from '../const/constMocks.ts';
import { classListMock } from '../const/classConstMocks.ts';
import { classHomeworksMock } from '../const/homeworkConstMocks.ts';
import { classStudentsMock } from '../const/studentConstMocks.ts';
import { classSolutionsMock } from '../const/solutionsConstMocks.ts';
import { classAnnouncementsMock } from '../const/announceConstMocks.ts';

export const classHandlers = [
    // Get class
    http.get(`${appPaths.basePath}${appPaths.class(':id')}`, ({ params }) => {
        const { id } = params;
        try {
            return HttpResponse.json(
                {
                    class: classListMock[Number(id)],
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

    // Get classes
    http.get(`${appPaths.basePath}${appPaths.classes}`, () => {
        try {
            return HttpResponse.json(
                {
                    classes: classListMock,
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
            const { id } = params;
            try {
                return HttpResponse.json(
                    {
                        students: classStudentsMock[Number(id)],
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

    // Get class anoounces
    http.get(
        `${appPaths.basePath}${appPaths.classAnnouncements(':id')}`,
        ({ params }) => {
            const { id } = params;
            try {
                return HttpResponse.json(
                    {
                        posts: classAnnouncementsMock[Number(id)],
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
            const { id } = params;
            try {
                return HttpResponse.json(
                    {
                        homeworks: classHomeworksMock[Number(id)],
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

    // Get class solutions
    http.get(
        `${appPaths.basePath}${appPaths.classSolutions(':id')}`,
        ({ params }) => {
            const { id } = params;
            try {
                return HttpResponse.json(
                    {
                        solutions: classSolutionsMock[Number(id)],
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
