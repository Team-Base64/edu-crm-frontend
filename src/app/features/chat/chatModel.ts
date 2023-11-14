export type chatMessageType = { text: string; chatID: number };

export interface apiChatMessageType {
    messages: { [index: string]: ChatMessageType[] };
    wasFetched: { [index: string]: boolean };
}

export type ChatMessageType = {
    ismine: boolean;
    text: string;
    date: string;
    chatID: number;
    id?: number;
    attaches?: string[];
    socialType?: string;
};

export interface postChatMessageType extends ChatMessageType {
    // attachments: File[];
}

export type attachmentRequestReturnType = { file: string };
