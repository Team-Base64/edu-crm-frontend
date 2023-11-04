import { apiSlice } from '../apiSlice.ts';
import { apiPaths } from '../../../consts.ts';
import { Homework } from 'app/features/models/homework.ts';

export const homeworkApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getHomework: build.query<
            { homework: Homework },
            { id: string | number }
        >({
            query: ({ id }) => {
                return {
                    url: apiPaths.homework(id),
                    method: 'GET',
                };
            },
        }),
    }),
});

export const { useGetHomeworkQuery } = homeworkApi;
