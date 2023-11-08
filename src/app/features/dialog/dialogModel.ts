export type dialogSelectType = {
    chatid: number;
    name: string;
    cover: string;
    isread: boolean;
    text: string;
    date: string;
};

export interface dialogSelectByIDType {
    [index: number]: dialogSelectType;
}