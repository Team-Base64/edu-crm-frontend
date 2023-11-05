import apiSlice from '@app/apiSlice';
import { Student } from '@app/features/stundent/stundentModel';
import { studentPaths } from '@app/features/stundent/studentPaths';

export const stundentSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getStudent: build.query<{ student: Student }, { id: string | number }>({
            query: ({ id }) => {
                return {
                    url: studentPaths.student(id),
                    method: 'GET',
                };
            },
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
        }),
    }),
});

export const { useGetClassStudentsQuery, useGetStudentQuery } = stundentSlice;
