import { UiComponentProps } from '@ui-kit/interfaces.ts';
import React from 'react';
import styles from '@ui-kit/Splitter/Splitter.module.scss';

const splitterDirection = {
    vertical: styles.splitterVertical,
    horizontal: styles.splitterHorizontal,
};

type SplitterDirectionType = keyof typeof splitterDirection;

const splitterThickness = {
    vertical: styles.splitterVertical,
    horizontal: styles.splitterHorizontal,
};

type SplitterThicknessType = keyof typeof splitterThickness;

interface SplitterProps extends UiComponentProps {
    direction: SplitterDirectionType;
    thickness: SplitterThicknessType;
}

const Splitter: React.FC<SplitterProps> = ({
    direction,
    thickness,
    classes = '',
}) => {
    return (
        <div
            className={[
                classes,
                splitterDirection[direction],
                styles.splitter,
                splitterThickness[thickness],
            ].join(' ')}
        ></div>
    );
};

export default Splitter;
