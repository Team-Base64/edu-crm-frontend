export type SocialNetworkType = 'vk' | 'tg';

export type Student = {
    id: number | string;
    name: string;
    avatarSrc: string;
    social_network: SocialNetworkType;
};
