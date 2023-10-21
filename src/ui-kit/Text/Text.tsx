import React, { HTMLAttributes } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces';
import styles from './Text.module.scss';

const textType = {
    h1: styles.h1, // No suggestions due to @for in scss
    h2: styles.h2,
    h3: styles.h3,
    h4: styles.h4,
    h5: styles.h5,
    h6: styles.h6,
    p: styles.p,
    p2: styles.p2, // React error here: no tag p2
};
export type TextType = keyof typeof textType;

const textWeight = {
    regular: styles.regular,
    bold: styles.bold,
};
export type TextWeight = keyof typeof textWeight;

interface TextProps extends UiComponentProps {
    type: TextType;
    weight?: TextWeight;
}

const Text: React.FC<TextProps> = ({
    type,
    weight = 'regular',
    classes = '',
    children,
    onClick,
}) => {
    const props: HTMLAttributes<HTMLElement> = {
        children: children,
        onClick: onClick,
        className: [textWeight[weight], textType[type], classes].join(' '),
    };
    return React.createElement(type, props, children);
};

export default Text;
