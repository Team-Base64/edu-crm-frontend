import { apiSlice } from '../apiSlice.ts';
import { apiPaths } from '../../../consts.ts';

export type classData = {
    id: number | string;
    title: string;
    description?: string;
};

export type classCreatePayload = {
    title: string;
    description?: string;
};

export type classStudent = {
    id: number | string;
    firstName: string;
    lastName: string;
    avatarSrc: string;
};

export type classAnnouncement = {
    id: string | number;
    text: string;
    time: string | number;
};

export type classCreateAnnouncementPayload = {
    text: string;
};

export const classApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getClasses: build.query<{ classes: classData[] }, unknown>({
            query: () => {
                return {
                    url: apiPaths.classes,
                    method: 'GET',
                };
            },
        }),

        getClassById: build.query<
            { class: classData },
            { id: string | number }
        >({
            query: ({ id }) => {
                return {
                    url: apiPaths.class(id),
                    method: 'GET',
                };
            },
        }),

        createClass: build.query<
            { class: classData },
            { payload: classCreatePayload }
        >({
            query: ({ payload }) => {
                return {
                    url: apiPaths.classNew,
                    body: JSON.stringify(payload),
                    method: 'POST',
                };
            },
        }),

        getClassUsersById: build.query<
            { students: classStudent[] },
            { id: number | string }
        >({
            query: ({ id }) => {
                console.log(id);
                return {
                    url: apiPaths.classStundets(id),
                    method: 'GET',
                };
            },
        }),

        getClassAnnouncementsById: build.query<
            { announcements: classAnnouncement[] },
            { id: number | string }
        >({
            query: ({ id }) => {
                return {
                    url: apiPaths.classAnnouncements(id),
                    method: 'GET',
                };
            },
        }),

        createClassAnnouncementById: build.query<
            { announcement: classAnnouncement },
            { id: number | string; payload: classCreateAnnouncementPayload }
        >({
            query: ({ id, payload }) => {
                return {
                    url: apiPaths.classAnnouncementsNew(id),
                    body: JSON.stringify(payload),
                    method: 'POST',
                };
            },
        }),
    }),
});

export const {
    useGetClassByIdQuery,
    useGetClassUsersByIdQuery,
    useGetClassAnnouncementsByIdQuery,
} = classApi;
