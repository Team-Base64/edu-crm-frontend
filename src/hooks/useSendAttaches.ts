import { useSendChatAttachesMutation } from '@app/features/chat/chatSlice.ts';
import { AttachmentDestTypes } from '@app/features/chat/chatModel.ts';
import { useState } from 'react';

export default function useSendAttaches(type: AttachmentDestTypes) {
    const [sendAttaches] = useSendChatAttachesMutation();
    const [attaches, setAttaches] = useState<File[]>([]);

    return {
        attaches,
        setAttaches,
        attachesSendPromise: () =>
            Promise.all(
                attaches.map((file) =>
                    sendAttaches({ attache: file, type: type }),
                ),
            ),
    };
}
