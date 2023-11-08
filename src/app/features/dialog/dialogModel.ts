export type dialogSelectType = {
    chatid: number;
    name: string;
    cover: string;
    isread: boolean;
    text: string;
    date: string;
    socialtype: string;
};

export interface dialogSelectByIDType {
    [index: number]: dialogSelectType;
}
