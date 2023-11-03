import { http, HttpResponse } from 'msw';

import { apiPaths } from '../../src/app/consts.js';

import {defaultHeadersMock} from '../const/constMocks.ts';

import {
    classListMock,
    classStundetsMock,
    classAnnouncementMock,
} from '../const/classConstMocks.ts';

export const classHandlers = [

    // Get class
    http.get(`${apiPaths.basePath}${apiPaths.class(':id')}`, ({ params }) => {
        const { id } = params;
        try {
            return HttpResponse.json(
                {
                    class: classListMock[Number(id)]
                },
                {
                    status: 200,
                    headers: { ...defaultHeadersMock },
                },
            );
        } catch (e) {
            return HttpResponse.json(
                {

                },
                {
                    status: 404,
                    headers: { ...defaultHeadersMock },
                },
            );
        }
    }),

     // Get classes
     http.get(`${apiPaths.basePath}${apiPaths.classes}`, () => {
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
                {

                },
                {
                    status: 404,
                    headers: { ...defaultHeadersMock },
                },
            );
        }
    }),

    // Get class users
    http.get(`${apiPaths.basePath}${apiPaths.classStundets(':id')}`, ({params}) => {
        const {id} = params;
        try {
            return HttpResponse.json(
                {
                    students: classStundetsMock[Number(id)],
                },
                {
                    status: 200,
                    headers: { ...defaultHeadersMock },
                },
            );
        } catch (e) {
            return HttpResponse.json(
                {

                },
                {
                    status: 404,
                    headers: { ...defaultHeadersMock },
                },
            );
        }
    }),

    // Get class anoounces
    http.get(`${apiPaths.basePath}${apiPaths.classAnnouncements(':id')}`, ({params}) => {
        const {id} = params;
        try {
            return HttpResponse.json(
                {
                    announcements: classAnnouncementMock[Number(id)],
                },
                {
                    status: 200,
                    headers: { ...defaultHeadersMock },
                },
            );
        } catch (e) {
            return HttpResponse.json(
                {

                },
                {
                    status: 404,
                    headers: { ...defaultHeadersMock },
                },
            );
        }
    }),
];
