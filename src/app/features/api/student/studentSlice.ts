import { apiSlice } from '../apiSlice.ts';
import { apiPaths } from '../../../consts.ts';
import { Student } from 'app/features/models';

export const studentApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getStudent: build.query<{ student: Student }, { id: string | number }>({
            query: ({ id }) => {
                return {
                    url: apiPaths.student(id),
                    method: 'GET',
                };
            },
        }),
    }),
});

export const { useGetStudentQuery } = studentApi;
