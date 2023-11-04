import { apiSlice } from '../apiSlice.ts';
import { apiPaths } from '../../../consts.ts';
import {
    ClassCreatePayload,
    ClassData,
    Student,
    Announcement,
    AnnouncementCreatePayload,
    Homework,
    HomeworkCreatePayload,
    HomeworkSolution,
} from 'app/features/models';

export const classApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getClasses: build.query<{ classes: ClassData[] }, unknown>({
            query: () => {
                return {
                    url: apiPaths.classes,
                    method: 'GET',
                };
            },
        }),

        getClassById: build.query<
            { class: ClassData },
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
            { class: ClassData },
            { payload: ClassCreatePayload }
        >({
            query: ({ payload }) => {
                return {
                    url: apiPaths.classCreate,
                    body: JSON.stringify(payload),
                    method: 'POST',
                };
            },
        }),

        getClassUsersById: build.query<
            { students: Student[] },
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

        getClassAnnuncementsById: build.query<
            { announcements: Announcement[] },
            { id: number | string }
        >({
            query: ({ id }) => {
                return {
                    url: apiPaths.classAnnouncements(id),
                    method: 'GET',
                };
            },
        }),

        createClassAnnuncementById: build.query<
            { announcement: Announcement },
            { id: number | string; payload: AnnouncementCreatePayload }
        >({
            query: ({ id, payload }) => {
                return {
                    url: apiPaths.classAnnouncementCreate(id),
                    body: JSON.stringify(payload),
                    method: 'POST',
                };
            },
        }),

        getClassHomeworks: build.query<
            { homeworks: Homework[] },
            { id: string | number }
        >({
            query: ({ id }) => {
                return {
                    url: apiPaths.classHomeworks(id),
                    method: 'GET',
                };
            },
        }),

        createClassHomework: build.query<
            { homework: Homework },
            { id: string | number; payload: HomeworkCreatePayload }
        >({
            query: ({ id, payload }) => {
                return {
                    url: apiPaths.homeworkCreate(id),
                    method: 'POST',
                    body: JSON.stringify(payload),
                };
            },
        }),

        getClassSolutions: build.query<
            { solutions: HomeworkSolution[] },
            { id: number | string }
        >({
            query: ({ id }) => {
                return {
                    url: apiPaths.classHomeworkSolutions(id),
                    method: 'GET',
                };
            },
        }),
    }),
});

export const {
    useGetClassByIdQuery,
    useGetClassUsersByIdQuery,
    useGetClassAnnuncementsByIdQuery,
    useGetClassesQuery,
    useCreateClassQuery,
    useCreateClassAnnuncementByIdQuery,
    useGetClassHomeworksQuery,
    useCreateClassHomeworkQuery,
    useGetClassSolutionsQuery,
} = classApi;
