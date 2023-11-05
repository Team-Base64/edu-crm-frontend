import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import apiPaths from '@app/apiPaths';
console.log('api slice');

const apiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: apiPaths.basePath,
        mode: 'cors',
    }),
    refetchOnFocus: true,
    refetchOnReconnect: true,
    // refetchOnMountOrArgChange: true,
    endpoints: () => ({}),
});
export default apiSlice;
