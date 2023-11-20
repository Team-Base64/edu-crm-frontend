import { SocialNetworkType } from '@app/features/stundent/stundentModel.ts';

export type dialogSelectType = {
    chatID: number;
    name: string;
    cover: string | undefined;
    isread: boolean;
    text: string;
    date: string;
    socialType: SocialNetworkType;
};

export interface dialogSelectByIDType {
    [index: number]: dialogSelectType;
}
