import appApi from '@app/appApi';
import {
    TeacherLoginPayload,
    TeacherRegisterPayload,
} from '@app/features/teacher/teacherModel';
import { teacherPaths } from '@app/features/teacher/teacherPaths';
import { setMe } from '@app/features/teacher/teacherSlice';

export const teacherApi = appApi.injectEndpoints({
    endpoints: (build) => ({
        checkAuth: build.query<{ me: boolean }, unknown>({
            query: () => {
                return {
                    url: teacherPaths.checkAuth,
                    method: 'GET',
                };
            },

            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { meta } = await queryFulfilled;
                    console.log(meta?.response?.ok);
                    if (meta && meta.response && meta.response.ok) {
                        dispatch(setMe(true));
                    } else {
                        dispatch(setMe(false));
                    }
                } catch (error) {
                    console.error(error);
                    dispatch(setMe(false));
                }
            },
        }),

        login: build.mutation<
            { me: boolean },
            { payload: TeacherLoginPayload }
        >({
            query: ({ payload }) => {
                return {
                    url: teacherPaths.login,
                    method: 'POST',
                    body: JSON.stringify(payload),
                };
            },

            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { meta } = await queryFulfilled;
                    if (meta && meta.response && meta.response.ok) {
                        dispatch(setMe(true));
                    } else {
                        dispatch(setMe(false));
                    }
                } catch (error) {
                    console.error(error);
                    dispatch(setMe(false));
                }
            },
        }),
        logout: build.mutation<unknown, unknown>({
            query: () => {
                return {
                    url: teacherPaths.logout,
                    method: 'DELETE',
                    body: {},
                };
            },

            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                console.log('asda');

                try {
                    const { meta } = await queryFulfilled;
                    console.log(meta);
                    if (meta && meta.response && meta.response.ok) {
                        dispatch(setMe(false));
                    }
                } catch (error) {
                    console.error(error);
                }
            },
        }),

        register: build.mutation<
            { me: boolean },
            { payload: TeacherRegisterPayload }
        >({
            query: ({ payload }) => {
                return {
                    url: teacherPaths.register,
                    method: 'POST',
                    body: JSON.stringify(payload),
                };
            },

            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { meta } = await queryFulfilled;
                    if (meta && meta.response && meta.response.ok) {
                        dispatch(setMe(true));
                    } else {
                        dispatch(setMe(false));
                    }
                } catch (error) {
                    console.error(error);
                    dispatch(setMe(false));
                }
            },
        }),
    }),
});

export const {
    useCheckAuthQuery,
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
} = teacherApi;
