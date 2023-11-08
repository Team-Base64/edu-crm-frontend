export type chatMessageType = { text: string; chatid: number };

export interface apiChatMessageType {
    messages: { [index: string]: ChatMessageType[] };
    wasFetched: { [index: string]: boolean };
}

export type ChatMessageType = {
    ismine: boolean;
    text: string;
    date: string;
    chatid: number;
    id?: number;
    attaches?: string[];
};

export interface postChatMessageType extends ChatMessageType {
    // attachments: File[];
}

export type attachmentsType = {
    attaches: File[];
    type: 'chat' | 'homework' | 'solution';
};

export type attachmentRequestReturnType = { file: string };
