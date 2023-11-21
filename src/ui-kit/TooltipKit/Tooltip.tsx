import React from 'react';
import { UiComponentProps } from '@ui-kit/interfaces.ts';
import Container from '@ui-kit/Container/Container';
import styles from './Tooltip.module.scss';
import Text from '@ui-kit/Text/Text';

interface SplitterProps extends UiComponentProps {
    place: placementOfTooltip;
    text: string;
    visibility?: visibilityOfTooltip;
}

const placeType = {
    top: styles.tooltipPlaceTop,
    bottom: styles.tooltipPlaceBottom,
    right: styles.tooltipPlaceRight,
    left: styles.tooltipPlaceLeft,
};
export type placementOfTooltip = keyof typeof placeType;

const visibilityType = {
    visible: '',
    onHover: styles.tooltipVisibilityOnHover,
    hidden: styles.tooltipVisibilityHidden,
};

export type visibilityOfTooltip = keyof typeof visibilityType;

const Tooltip: React.FC<SplitterProps> = ({
    place,
    text,
    children,
    classes,
    visibility = 'onHover',
}) => {
    const arrowPlaceLeftValue = 105;
    const arrowPlaceRightValue = 100;

    return (
        <Container
            classes={[styles.tooltip, classes].join(' ')}
            style={{
                ['--tooltip-arrow-place-left-value' as string]: `${arrowPlaceLeftValue}%`,
                ['--tooltip-arrow-place-right-value' as string]: `${arrowPlaceRightValue}%`,
            }}
        >
            {children}
            <Text
                type={'p'}
                size={2}
                classes={[placeType[place], visibilityType[visibility]].join(
                    ' ',
                )}
            >
                {text ? text : ''}
            </Text>
        </Container>
    );
};

export default Tooltip;
