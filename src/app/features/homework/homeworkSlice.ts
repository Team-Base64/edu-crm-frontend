import apiSlice from '@app/apiSlice';
import {
    Homework,
    HomeworkCreatePayload,
} from '@app/features/homework/homeworkModel';
import { homeworkPaths } from '@app/features/homework/homeworkPaths';

export const homeworkSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getHomeworks: build.query<{ homeworks: Homework[] }, unknown>({
            query: () => {
                return {
                    url: homeworkPaths.homeworks,
                    method: 'GET',
                };
            },
        }),

        getHomework: build.query<
            { homework: Homework },
            { id: string | number }
        >({
            query: ({ id }) => {
                return {
                    url: homeworkPaths.homework(id),
                    method: 'GET',
                };
            },
        }),

        getClassHomeworks: build.query<
            { homeworks: Homework[] },
            { id: string | number }
        >({
            query: ({ id }) => {
                return {
                    url: homeworkPaths.classHomeworks(id),
                    method: 'GET',
                };
            },
        }),

        createHomework: build.mutation<
            { homework: Homework },
            { class_id: string | number; payload: HomeworkCreatePayload }
        >({
            query: ({ class_id, payload }) => {
                return {
                    url: homeworkPaths.homeworkCreate(class_id),
                    method: 'POST',
                    body: JSON.stringify(payload),
                };
            },
        }),
    }),
});

export const {
    useGetHomeworkQuery,
    useGetClassHomeworksQuery,
    useGetHomeworksQuery,
    useCreateHomeworkMutation,
} = homeworkSlice;
