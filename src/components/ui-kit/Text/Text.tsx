import React from 'react';
import styles from './Text.module.scss';
import {UiComponentProps} from '../../../../types/interfaces';

const stylesSize = {
    s: styles['Text--size-s'],
    m: styles['Text--size-m'],
    l: styles['Text--size-l'],
};


interface TextProps extends UiComponentProps {

}

const Text: React.FC<TextProps> = ({
    onClick,
    size = 'm',
    classes,
    children,
}) => {
    return (
        <p
            onClick={onClick}
            className={[classes, styles.Text, stylesSize[size]].join(' ')}
        >
            {children}
        </p>
    );
};
