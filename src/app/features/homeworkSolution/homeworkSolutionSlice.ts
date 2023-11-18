import appApi from '@app/appApi';
import { HomeworkSolution } from '@app/features/homeworkSolution/homeworkSolutionModel';
import { homeworkSolutionPaths } from '@app/features/homeworkSolution/homeworkSolutionPaths';

export const homeworkSolutionSlice = appApi.injectEndpoints({
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

        getSolution: build.query<HomeworkSolution, {id: number | string}>({
            query: ({id}) => {
                return {
                    url: homeworkSolutionPaths.solution(id),
                    method: 'GET',
                };
            },
        }),
    }),
});

export const { 
    useGetClassSolutionsQuery,
    useGetSolutionQuery,
 } = homeworkSolutionSlice;
