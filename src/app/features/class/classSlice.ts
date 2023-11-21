import appApi from '@app/appApi';
import { ClassCreatePayload, ClassData } from '@app/features/class/classModel';
import { classPaths } from '@app/features/class/classPaths';

export const classApi = appApi
    .enhanceEndpoints({
        addTagTypes: ['Class'],
    })
    .injectEndpoints({
        endpoints: (build) => ({
            getClasses: build.query<{ classes: ClassData[] }, unknown>({
                query: () => {
                    return {
                        url: classPaths.classes,
                        method: 'GET',
                    };
                },
                providesTags: ['Class'],
            }),

            getClassById: build.query<
                { class: ClassData },
                { id: string | number }
            >({
                query: ({ id }) => {
                    return {
                        url: classPaths.class(id),
                        method: 'GET',
                    };
                },
            }),

            createClass: build.mutation<
                { class: ClassData },
                { payload: ClassCreatePayload }
            >({
                query: ({ payload }) => {
                    return {
                        url: classPaths.classCreate,
                        body: JSON.stringify(payload),
                        method: 'POST',
                    };
                },
                invalidatesTags: ['Class'],
            }),
        }),
    });

export const {
    useGetClassByIdQuery,
    useGetClassesQuery,
    useCreateClassMutation,
} = classApi;
