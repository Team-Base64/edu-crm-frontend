import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import appPaths from '@app/appPaths';

const appApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: appPaths.basePath,
        mode: 'cors',
    }),
    refetchOnFocus: true,
    refetchOnReconnect: true,
    // refetchOnMountOrArgChange: true,
    endpoints: () => ({}),
    tagTypes: ['getDialogs'],
});
export default appApi;
