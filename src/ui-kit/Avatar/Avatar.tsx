import React, { useRef } from 'react';
import { UiComponentProps, UiComponentPropsMap } from '@ui-kit/interfaces';
import styles from './Avatar.module.scss';

const avatarSizes: UiComponentPropsMap = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
};
export type AvatarSize = keyof typeof avatarSizes;

interface AvatarProps extends UiComponentProps {
    src: string;
    size?: AvatarSize;
}

const Avatar: React.FC<AvatarProps> = ({
    src,
    size = 'medium',
    onClick,
    classes,
}) => {
    const img_ref = useRef<HTMLImageElement>(null);

    const handleLoad = () => {
        if (!img_ref.current) {
            return;
        }
        img_ref.current.classList.remove(styles.avatar__imageUnload);

        img_ref.current.classList.add(
            img_ref.current.width / img_ref.current.height > 1
                ? styles.avatar__imageLandscape
                : styles.avatar__imagePortrait,
        );
    };
    return (
        <div className={[styles.avatar, avatarSizes[size], classes].join(' ')}>
            <img
                ref={img_ref}
                src={src}
                onClick={onClick}
                className={[styles.avatar__image].join(' ')}
                onLoad={handleLoad}
            />
        </div>
    );
};

export default Avatar;
