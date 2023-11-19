import appApi from '@app/appApi';
import {
    Homework,
    HomeworkCreatePayload,
} from '@app/features/homework/homeworkModel';
import { homeworkPaths } from '@app/features/homework/homeworkPaths';

export const homeworkSlice = appApi
    .enhanceEndpoints({
        addTagTypes: ['Homeworks', 'ClassHomeworks'],
    })
    .injectEndpoints({
        endpoints: (build) => ({
            getHomeworks: build.query<{ homeworks: Homework[] }, unknown>({
                query: () => {
                    return {
                        url: homeworkPaths.homeworks,
                        method: 'GET',
                    };
                },
                providesTags: (result) => (
                    result ?
                        [...result.homeworks
                            .map(({ id }) => ({
                                type: 'Homeworks' as const,
                                id: id,
                            })),
                            'Homeworks'
                        ]
                        :
                        ['Homeworks']
                ),
            }),

            getHomework: build.query<
                { homework: Homework },
                { id: string | number }
            >({
                query: ({ id }) => {
                    console.log('slice ', id);
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
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                providesTags: (result, error, arg) => ([{
                    type: 'ClassHomeworks',
                    id: arg.id,
                }]),
            }),

            createHomework: build.mutation<
                { homework: Homework },
                { payload: HomeworkCreatePayload }
            >({
                query: ({ payload }) => {
                    return {
                        url: homeworkPaths.homeworkCreate,
                        method: 'POST',
                        body: JSON.stringify(payload),
                    };
                },
                
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                invalidatesTags: (result, error, arg) => {
                    console.log('Invalidate');
                    return [
                        {
                            type: 'Homeworks',
                        },
                        {
                            type: 'ClassHomeworks',
                            id: arg.payload.classID,
                        },
                    ];
                }
            }),
        }),
    });

export const {
    useGetHomeworkQuery,
    useGetClassHomeworksQuery,
    useGetHomeworksQuery,
    useCreateHomeworkMutation,
} = homeworkSlice;
