export interface Message {
    id: number;
    chatId: number;
    time?: string;
    text: string;
    authorId?: number;
}
