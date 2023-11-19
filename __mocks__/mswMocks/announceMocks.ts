import { http, HttpResponse } from 'msw';

import appPaths from '../../src/app/appPaths';

import { defaultHeadersMock } from '../const/constMocks.ts';
import { classAnnouncementsMock } from '../const/announceConstMocks.ts';
import { Announcement, AnnouncementCreatePayload } from '../../src/app/features/announcement/announcementModel.ts';


export const announceHandlers = [

    // Create class announce 
    http.post<{ id: string }, AnnouncementCreatePayload>(
        `${appPaths.basePath}${appPaths.createAnnouncement(':id')}`,
        async ({ params, request }) => {
            try {
                const classID = params.id;
                const payload = await request.json();
                const newA: Announcement = {
                    id: Date.now(),
                    createTime: new Date(Date.now()).toISOString(),
                    ...payload,
                };
                classAnnouncementsMock[Number(classID)].push(newA);

                return HttpResponse.json(
                    {
                        post: newA,
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
        }
    ),

    // Get class anoounces
    http.get(
        `${appPaths.basePath}${appPaths.classAnnouncements(':id')}`,
        ({ params }) => {
            const id = Number(params.id);
            try {
                return HttpResponse.json(
                    {
                        posts: classAnnouncementsMock[id],
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