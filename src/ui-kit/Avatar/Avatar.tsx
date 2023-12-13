import React from 'react';
import { UiComponentProps, UiComponentPropsMap } from '@ui-kit/interfaces';
import styles from './Avatar.module.scss';
import Image from '@ui-kit/Image/Image';

const avatarSizes: UiComponentPropsMap = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
};
export type AvatarSize = keyof typeof avatarSizes;

interface AvatarProps extends UiComponentProps {
    src: string;
    alt?: string;
    size?: AvatarSize;
}

const Avatar: React.FC<AvatarProps> = ({
    src,
    size = 'medium',
    alt = 'avatar',
    onClick,
    classes,
}) => {
    const mock = 'https://educrm.us.to/filestorage/mock-avatar.png';
    return (
        <div
            onClick={onClick}
            className={[styles.avatar, avatarSizes[size], classes].join(' ')}
        >
            <Image
                classes={styles.avatar__image}
                src={src && src.length ? src : mock}
                alt={alt}
            />
        </div>
    );
};

export default Avatar;
