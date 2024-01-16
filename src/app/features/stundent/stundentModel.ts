export type SocialNetworkType = 'vk' | 'tg';

export type Student = {
    id: number;
    name: string;
    avatar: string;
    socialType: SocialNetworkType;
    chatID: number;
};
