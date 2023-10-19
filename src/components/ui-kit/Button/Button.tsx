import React from 'react';
import styles from './Button.module.scss';
import {UiComponentProps} from '../../../../types/interfaces';

const stylesSize = {
    s: styles['Button--size-s'],
    m: styles['Button--size-m'],
    l: styles['Button--size-l'],
    undefined: '',
};

const stylesMode = {
    primary: styles['Button--mode-primary'],
    secondary: styles['Button--mode-secondary'],
    link: styles['Button--mode-link'],
    undefined: '',
};

interface ButtonProps extends UiComponentProps {
    mode: 'primary' | 'secondary' | 'link' | 'undefined';
}

const Button: React.FC<ButtonProps> = ({
    mode = 'undefined',
    onClick,
    children,
    size = 'undefined',
    classes= '',
}) => {
    return (
        <button
            onClick={onClick}
            className={[styles.Button, stylesMode[mode], stylesSize[size], classes].join(' ')}
        >
            {children}
        </button>
    );
};

export default Button;
