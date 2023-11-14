import { useState } from 'react';
import { useSendChatAttachesMutation } from '@app/features/attaches/attachesSlice.ts';
import { AttachmentDestTypes } from '@app/features/attaches/attachesModel.ts';

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
