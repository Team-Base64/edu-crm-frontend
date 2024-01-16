import appApi from '@app/appApi';
import { Student } from '@app/features/stundent/stundentModel';
import { studentPaths } from '@app/features/stundent/studentPaths';
import { getSocket } from '@app/websocket.ts';

export const stundentSlice = appApi.injectEndpoints({
    endpoints: (build) => ({
        getStudent: build.query<{ student: Student }, { id: string | number }>({
            query: ({ id }) => {
                return {
                    url: studentPaths.student(id),
                    method: 'GET',
                };
            },
            providesTags: ['getStudent'],
            async onCacheEntryAdded(
                _,
                { cacheDataLoaded, cacheEntryRemoved, dispatch },
            ) {
                const socket = getSocket();
                try {
                    await cacheDataLoaded;

                    socket.onmessage = (event: MessageEvent) => {
                        const data = JSON.parse(event.data);
                        if (data.channel === 'newchat') {
                            dispatch(
                                stundentSlice.util.invalidateTags([
                                    'getClassStudents',
                                    'getStudent',
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
        getClassStudents: build.query<
            { students: Student[] },
            { class_id: string | number }
        >({
            query: ({ class_id }) => {
                return {
                    url: studentPaths.classStudents(class_id),
                    method: 'GET',
                };
            },
            providesTags: ['getClassStudents'],
            async onCacheEntryAdded(
                _,
                { cacheDataLoaded, cacheEntryRemoved, dispatch },
            ) {
                const socket = getSocket();
                try {
                    await cacheDataLoaded;

                    socket.onmessage = (event: MessageEvent) => {
                        const data = JSON.parse(event.data);
                        if (data.channel === 'newchat') {
                            dispatch(
                                stundentSlice.util.invalidateTags([
                                    'getClassStudents',
                                    'getStudent',
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

export const { useGetClassStudentsQuery, useGetStudentQuery } = stundentSlice;
