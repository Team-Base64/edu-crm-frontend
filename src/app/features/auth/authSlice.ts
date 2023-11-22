import appApi from '@app/appApi.ts';
import appPaths from '@app/appPaths.ts';
import { authPaths } from '@app/features/auth/authPaths.ts';

export const authSlice = appApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.query<unknown, unknown>({
            query: () => {
                return {
                    url: `${appPaths.baseChatPath}${authPaths.login}`,
                    method: 'GET',
                };
            },
        }),
        logout: build.mutation<unknown, unknown>({
            query: () => {
                return {
                    url: `${appPaths.baseChatPath}${authPaths.logout}`,
                    method: 'DELETE',
                };
            },
        }),
        checkAuth: build.query<unknown, unknown>({
            query: () => {
                return {
                    url: `${appPaths.baseChatPath}${authPaths.checkAuth}`,
                    method: 'GET',
                };
            },
        }),
    }),
});

// export const {} = authSlice;
