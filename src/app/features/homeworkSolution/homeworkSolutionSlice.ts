import appApi from '@app/appApi';
import { HomeworkSolution } from '@app/features/homeworkSolution/homeworkSolutionModel';
import { homeworkSolutionPaths } from '@app/features/homeworkSolution/homeworkSolutionPaths';

export const homeworkSolutionSlice = appApi
    .enhanceEndpoints({
        addTagTypes: ['Solutions'],
    })
    .injectEndpoints({
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
                providesTags: (res) => {
                    if (!res) return ['Solutions'];
                    return res.solutions.map(s => ({
                        type: 'Solutions',
                        id: s.id,
                    }));
                },
            }),

            getHomeworkSolutions: build.query<
                { solutions: HomeworkSolution[] },
                { homeworkID: string | number }
            >({
                query: ({ homeworkID }) => {
                    return {
                        url: homeworkSolutionPaths.homeworkSolutions(homeworkID),
                        method: 'GET',
                    };
                },
                providesTags: (res) => {
                    if (!res) return ['Solutions'];
                    return res.solutions.map(s => ({
                        type: 'Solutions',
                        id: s.id,
                    }));
                },
            }),

            getSolution: build.query<
                { solution: HomeworkSolution },
                { id: number | string }
            >({
                query: ({ id }) => {
                    return {
                        url: homeworkSolutionPaths.solution(id),
                        method: 'GET',
                    };
                },
                providesTags: (res, _, arg) => {
                    if (!res) return ['Solutions'];
                    return [{
                        type: 'Solutions',
                        id: arg.id,
                    }];
                },
            }),
        }),
    });

export const {
    useGetClassSolutionsQuery,
    useGetSolutionQuery,
    useGetHomeworkSolutionsQuery,
} = homeworkSolutionSlice;
