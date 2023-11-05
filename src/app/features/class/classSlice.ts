import appApi from '@app/appApi';
import { ClassCreatePayload, ClassData } from '@app/features/class/classModel';
import { classPaths } from '@app/features/class/classPaths';
console.log('class clise');

export const classApi = appApi.injectEndpoints({
    endpoints: (build) => ({
        getClasses: build.query<{ classes: ClassData[] }, unknown>({
            query: () => {
                return {
                    url: classPaths.classes,
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
        }),
    }),
});

export const {
    useGetClassByIdQuery,
    useGetClassesQuery,
    useCreateClassMutation,
} = classApi;
