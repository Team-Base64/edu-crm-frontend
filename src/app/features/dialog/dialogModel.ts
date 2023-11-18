import { SocialNetworkType } from '@app/features/stundent/stundentModel.ts';

export type dialogSelectType = {
    chatid: number;
    name: string;
    cover: string;
    isread: boolean;
    text: string;
    date: string;
    socialtype: SocialNetworkType;
};

export interface dialogSelectByIDType {
    [index: number]: dialogSelectType;
}
