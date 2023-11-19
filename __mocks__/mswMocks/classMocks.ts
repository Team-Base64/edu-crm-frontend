import { http, HttpResponse } from 'msw';

import appPaths from '../../src/app/appPaths';

import { defaultHeadersMock } from '../const/constMocks.ts';
import { classListMock } from '../const/classConstMocks.ts';
import { classHomeworksMock } from '../const/homeworkConstMocks.ts';
import { classStudentsMock } from '../const/studentConstMocks.ts';
import { classSolutionsMock } from '../const/solutionsConstMocks.ts';
import { ClassCreatePayload, ClassData } from '@app/features/class/classModel.ts';
import { classAnnouncementsMock } from '../const/announceConstMocks.ts';

export const classHandlers = [
    // Get class
    http.get(`${appPaths.basePath}${appPaths.class(':id')}`, ({ params }) => {
        const  id  = Number(params.id);
        try {
            return HttpResponse.json(
                {
                    class: classListMock.filter(i => i.id === id)[0],
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

    // CreateClass 
    http.post<any, ClassCreatePayload>(`${appPaths.basePath}${appPaths.classCreate}`,
        async (info) => {
            try {
                const payload = await info.request.json();

                const clN: ClassData = {
                    ...payload,
                    id: Date.now(),
                    inviteToken: Date.now().toString(),
                }

                classListMock.push(clN);
                classHomeworksMock[Number(clN.id)] = [];
                classStudentsMock[Number(clN.id)] = [];
                classSolutionsMock[Number(clN.id)] = [];
                classAnnouncementsMock[Number(clN.id)] = [];

                return HttpResponse.json(
                    {
                        class: clN,
                    },
                    {
                        status: 200,
                        headers: { ...defaultHeadersMock },
                    }
                );
            }
            catch (e) {

                console.log(e);
                return HttpResponse.json(
                    {},
                    {
                        status: 500,
                        headers: { ...defaultHeadersMock },
                    },
                );
            }
        })
];
