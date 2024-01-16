import appApi from '@app/appApi';
import { HomeworkSolution } from '@app/features/homeworkSolution/homeworkSolutionModel';
import { homeworkSolutionPaths } from '@app/features/homeworkSolution/homeworkSolutionPaths';
import { getSocket } from '@app/websocket.ts';

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
                providesTags: ['getClassSolutions'],
                async onCacheEntryAdded(
                    _,
                    { cacheDataLoaded, cacheEntryRemoved, dispatch },
                ) {
                    const socket = getSocket();
                    try {
                        await cacheDataLoaded;
                        socket.onmessage = (event: MessageEvent) => {
                            const data = JSON.parse(event.data);
                            if (data.channel === 'newsolution') {
                                dispatch(
                                    homeworkSolutionSlice.util.invalidateTags([
                                        'getClassSolutions',
                                    ]),
                                );
                            }
                        };
                    } catch {
                        console.error('error ws api');
                    }
                    await cacheEntryRemoved;
                    socket.close();
                },
            }),

            getHomeworkSolutions: build.query<
                { solutions: HomeworkSolution[] },
                { homeworkID: string | number }
            >({
                query: ({ homeworkID }) => {
                    return {
                        url: homeworkSolutionPaths.homeworkSolutions(
                            homeworkID,
                        ),
                        method: 'GET',
                    };
                },
                providesTags: ['getHomeworkSolutions'],
                async onCacheEntryAdded(
                    _,
                    { cacheDataLoaded, cacheEntryRemoved, dispatch },
                ) {
                    const socket = getSocket();
                    try {
                        await cacheDataLoaded;

                        socket.onmessage = (event: MessageEvent) => {
                            const data = JSON.parse(event.data);
                            if (data.channel === 'newsolution') {
                                dispatch(
                                    homeworkSolutionSlice.util.invalidateTags([
                                        'getHomeworkSolutions',
                                    ]),
                                );
                            }
                        };
                    } catch {
                        console.error('error ws api');
                    }
                    await cacheEntryRemoved;
                    socket.close();
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
                providesTags: ['getSolution'],
                async onCacheEntryAdded(
                    _,
                    { cacheDataLoaded, cacheEntryRemoved, dispatch },
                ) {
                    const socket = getSocket();
                    try {
                        await cacheDataLoaded;

                        socket.onmessage = (event: MessageEvent) => {
                            const data = JSON.parse(event.data);
                            if (data.channel === 'newsolution') {
                                dispatch(
                                    homeworkSolutionSlice.util.invalidateTags([
                                        'getSolution',
                                    ]),
                                );
                            }
                        };
                    } catch {
                        console.error('error ws api');
                    }
                    await cacheEntryRemoved;
                    socket.close();
                },
            }),
        }),
    });

export const {
    useGetClassSolutionsQuery,
    useGetSolutionQuery,
    useGetHomeworkSolutionsQuery,
} = homeworkSolutionSlice;
