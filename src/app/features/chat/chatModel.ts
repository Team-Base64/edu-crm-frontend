import { SocialNetworkType } from '@app/features/stundent/stundentModel.ts';

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
    socialType?: SocialNetworkType;
};

export interface postChatMessageType extends ChatMessageType {}

export type attachmentRequestReturnType = { file: string };
