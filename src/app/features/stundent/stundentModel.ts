export type SocialNetworkType = 'vk' | 'tg';

export type Student = {
    id: number;
    name: string;
    avatarSrc: string;
    socialType: SocialNetworkType;
};
