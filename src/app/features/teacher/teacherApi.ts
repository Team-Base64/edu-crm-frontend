import appApi from '@app/appApi';
import {
    Teacher,
    TeacherLoginPayload,
    TeacherRegisterPayload,
} from '@app/features/teacher/teacherModel';
import { teacherPaths } from '@app/features/teacher/teacherPaths';
import { setMe } from '@app/features/teacher/teacherSlice';

export const teacherApi = appApi.injectEndpoints({
    endpoints: (build) => ({
        getMe: build.query<{ me: Teacher }, unknown>({
            query: () => {
                return {
                    url: teacherPaths.me,
                    method: 'GET',
                };
            },

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setMe(data.me));
                } catch (error) {
                    console.log(error);
                }
            },
        }),

        login: build.mutation<
            { me: Teacher },
            { payload: TeacherLoginPayload }
        >({
            query: ({ payload }) => {
                return {
                    url: teacherPaths.login,
                    method: 'POST',
                    body: JSON.stringify(payload),
                };
            },

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    console.log('APP login wait fullfilled');
                    const { data } = await queryFulfilled;
                    console.log('APP login fullfilled', data);
                    dispatch(setMe(data.me));
                } catch (error) {
                    console.log(error);
                }
            },
        }),

        register: build.mutation<
            { me: Teacher },
            { payload: TeacherRegisterPayload }
        >({
            query: ({ payload }) => {
                return {
                    url: teacherPaths.register,
                    method: 'POST',
                    body: JSON.stringify(payload),
                };
            },

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setMe(data.me));
                } catch (error) {
                    console.log(error);
                }
            },
        }),
    }),
});

export const { useGetMeQuery, useLoginMutation, useRegisterMutation } =
    teacherApi;
