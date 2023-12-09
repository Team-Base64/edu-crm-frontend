import appApi from '@app/appApi';
import { Student } from '@app/features/stundent/stundentModel';
import { studentPaths } from '@app/features/stundent/studentPaths';

export const stundentSlice = appApi.injectEndpoints({
    endpoints: (build) => ({
        getStudent: build.query<{ student: Student }, { id: string | number }>({
            query: ({ id }) => {
                return {
                    url: studentPaths.student(id),
                    method: 'GET',
                };
            },
            providesTags: ['getStudent'],
        }),
        getClassStudents: build.query<
            { students: Student[] },
            { class_id: string | number }
        >({
            query: ({ class_id }) => {
                return {
                    url: studentPaths.classStudents(class_id),
                    method: 'GET',
                };
            },
            providesTags: ['getClassStudents'],
        }),
    }),
});

export const { useGetClassStudentsQuery, useGetStudentQuery } = stundentSlice;
