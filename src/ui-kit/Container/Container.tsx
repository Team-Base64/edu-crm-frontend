import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces';
import styles from './Container.module.scss';

const containerDirection = {
    vertical: styles.vertical,
    horizontal: styles.horizontal,
};
export type ContainerDirection = keyof typeof containerDirection;

const containerGap = {
    s: styles.containerGapSmall,
    m: styles.containerGapMedium,
    l: styles.containerGapLarge,
};
export type ContainerGap = keyof typeof containerGap;

interface ContainerProps extends UiComponentProps {
    direction?: ContainerDirection;
    gap?: ContainerGap;
}

const Container: React.FC<ContainerProps> = ({
    direction = 'horizontal',
    gap = 'm',
    onClick,
    children,
    classes,
}) => {
    return (
        <div
            className={[
                styles.container,
                containerDirection[direction],
                containerGap[gap],
                classes,
            ].join(' ')}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Container;
