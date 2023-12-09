import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import appPaths from '@app/appPaths';

const appApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: appPaths.basePath,
        mode: 'cors',
        credentials: 'include',
    }),
    // refetchOnFocus: true,
    refetchOnReconnect: true,
    // refetchOnMountOrArgChange: true,
    endpoints: () => ({}),
    tagTypes: [
        'getDialogs',
        'getEvents',
        'getClassSolutions',
        'getHomeworkSolutions',
        'getSolution',
        'getClassStudents',
        'getStudent',
    ],
});
export default appApi;
