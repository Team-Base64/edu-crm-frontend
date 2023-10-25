import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ChatMessage } from '@components/Messenger/Messenger.tsx';

const sendMessage = build.mutation<unknown, { message: string }>({
    query({ message }) {
        const socket = getSocket();
        socket.send(JSON.stringify({ message }));
        return JSON.stringify({ message });
    },
});
