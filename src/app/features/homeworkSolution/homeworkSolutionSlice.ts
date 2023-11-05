import apiSlice from '@app/apiSlice';
import { HomeworkSolution } from '@app/features/homeworkSolution/homeworkSolutionModel';
import { homeworkSolutionPaths } from '@app/features/homeworkSolution/homeworkSolutionPaths';

export const homeworkSolutionSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getClassSolutions: build.query<
            { solutions: HomeworkSolution[] },
            { class_id: string | number }
        >({
            query: ({ class_id }) => {
                return {
                    url: homeworkSolutionPaths.classSolutions(class_id),
                    method: 'GET',
                };
            },
        }),
    }),
});

export const { useGetClassSolutionsQuery } = homeworkSolutionSlice;
