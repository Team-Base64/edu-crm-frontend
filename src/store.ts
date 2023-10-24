import { configureStore } from '@reduxjs/toolkit';
import webSocketReducer from './features/webSocket/webSocketSlice.ts';
import { chatApi } from './services/chat.ts';

export const store = configureStore({
    reducer: {
        webSocket: webSocketReducer,
        [chatApi.reducerPath]: chatApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(chatApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
