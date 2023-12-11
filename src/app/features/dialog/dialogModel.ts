import { SocialNetworkType } from '@app/features/stundent/stundentModel.ts';

export type dialogSelectType = {
    chatID: number;
    studentName: string;
    cover: string;
    studentAvatar: string;
    isread: boolean;
    text: string;
    date: string;
    socialType: SocialNetworkType;
    studentID: number;
};

export interface dialogSelectByIDType {
    [index: number]: dialogSelectType;
}
