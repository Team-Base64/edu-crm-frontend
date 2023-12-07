import React, { HTMLAttributes } from 'react';
import { UiComponentProps } from '@ui-kit/interfaces';
import styles from './Text.module.scss';

const textColor = {
    default: styles.defaultColor,
    light: styles.lightColor,
};
type TextColorType = keyof typeof textColor;

const textType = {
    h: (size: TextSizeType) => styles[`h${size}`],
    p: (size: TextSizeType) => styles[`p${size}`],
};
type TextType = keyof typeof textType;

type TextSizeType = 1 | 2 | 3 | 4 | 5 | 6;

const textWeight = {
    regular: styles.regular,
    bold: styles.bold,
};
type TextWeightType = keyof typeof textWeight;

export interface TextProps extends UiComponentProps {
    type: TextType;
    size: TextSizeType;
    weight?: TextWeightType;
    color?: TextColorType;
}

const Text: React.FC<TextProps> = ({
    type,
    size,
    weight = 'regular',
    color = 'default',
    classes = '',
    children,
    onClick,
}) => {
    const props: HTMLAttributes<HTMLElement> = {
        children: children,
        onClick: onClick,
        className: [
            textWeight[weight],
            textType[type].call({}, size),
            classes,
            styles.text,
            textColor[color],
        ].join(' '),
    };
    return React.createElement(
        type + (type === 'h' ? size : ''),
        props,
        children,
    );
};

export default Text;
