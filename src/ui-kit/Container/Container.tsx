import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces';
import styles from './Container.module.scss';

const containerDirection = {
    vertical: styles.vertical,
    horizontal: styles.horizontal,
    grid: styles.grid,
};
type ContainerDirection = keyof typeof containerDirection;

const containerGap = {
    s: styles.containerGapSmall,
    m: styles.containerGapMedium,
    l: styles.containerGapLarge,
    '': '',
};
type ContainerGap = keyof typeof containerGap;

const layoutType = {
    defaultBase: styles.containerLayoutBaseDefault,
    base: styles.containerLayoutBase,
    sub: styles.containerLayoutSub,
    '': '',
};

type LayoutType = keyof typeof layoutType;

interface ContainerProps extends UiComponentProps {
    direction?: ContainerDirection;
    gap?: ContainerGap;
    containerRef?: React.Ref<HTMLDivElement>;
    layout?: LayoutType;
}

const Container: React.FC<ContainerProps> = ({
    direction = 'horizontal',
    gap = 'm',
    onClick,
    children,
    classes,
    containerRef,
    layout = '',
}) => {
    return (
        <div
            className={[
                styles.container,
                containerDirection[direction],
                containerGap[gap],
                classes,
                layoutType[layout],
            ].join(' ')}
            onClick={onClick}
            ref={containerRef}
        >
            {children}
        </div>
    );
};

export default Container;
