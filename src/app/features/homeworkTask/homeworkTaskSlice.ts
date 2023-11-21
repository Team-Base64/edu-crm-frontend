import appApi from '@app/appApi';
import { HomeworkTask, HomeworkTaskCreatePayload } from './homeworkTaskModel';
import { homeworkTaskPaths } from './homeworkTaskPaths';

export const homeworkTaskSlice = appApi
    .enhanceEndpoints({
        addTagTypes: ['HomeworkTasks'],
    })
    .injectEndpoints({
        endpoints: (build) => ({
            getTasks: build.query<{ tasks: HomeworkTask[] }, unknown>({
                query: () => {
                    return {
                        url: homeworkTaskPaths.tasks,
                        method: 'GET',
                    };
                },
                providesTags: ['HomeworkTasks'],
            }),

            getTask: build.query<HomeworkTask, { id: number }>({
                query: ({ id }) => {
                    return {
                        url: homeworkTaskPaths.task(id),
                        method: 'GET',
                    };
                },
            }),

            createTask: build.mutation<
                { id: number },
                { payload: HomeworkTaskCreatePayload }
            >({
                query: ({ payload }) => {
                    return {
                        url: homeworkTaskPaths.createTask,
                        method: 'POST',
                        body: JSON.stringify(payload),
                    };
                },
                invalidatesTags: ['HomeworkTasks'],
            }),
        }),
    });

export const { useGetTasksQuery, useGetTaskQuery, useCreateTaskMutation } =
    homeworkTaskSlice;
