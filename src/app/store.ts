import { configureStore } from '@reduxjs/toolkit';
import appApi from './appApi';
import { teacherSlice } from '@app/features/teacher/teacherSlice';

export const store = configureStore({
    reducer: {
        [appApi.reducerPath]: appApi.reducer,
        teacherState: teacherSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(appApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
