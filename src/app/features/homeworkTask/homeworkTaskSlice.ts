import appApi from '@app/appApi';
import { HomeworkTask } from './homeworkTaskModel';
import { homeworkTaskPaths } from './homeworkTaskPaths';

export const homeworkTaskSlice = appApi.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query<{ tasks: HomeworkTask[] }, unknown>({
            query: () => {
                return {
                    url: homeworkTaskPaths.tasks,
                    method: 'GET',
                };
            },
        }),
    }),
});

export const {
    useGetTasksQuery,
} = homeworkTaskSlice;
