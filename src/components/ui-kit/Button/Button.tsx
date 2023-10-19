import React from 'react';
import styles from './Button.module.scss';
import {UiComponentProps} from '../../../../types/interfaces';

const stylesSize = {
    s: styles['Button--size-s'],
    m: styles['Button--size-m'],
    l: styles['Button--size-l'],
};

const stylesMode = {
    primary: styles['Button--mode-primary'],
    secondary: styles['Button--mode-secondary'],
    link: styles['Button--mode-link'],
};

interface ButtonProps extends UiComponentProps {
    mode: 'primary' | 'secondary' | 'link';
}

const Button: React.FC<ButtonProps> = ({
    mode,
    onClick,
    children,
    size = 'm',
    classes= '',
}) => {
    return (
        <button
            onClick={onClick}
            className={[classes, styles.Button, stylesMode[mode], stylesSize[size]].join(' ')}
        >
            {children}
        </button>
    );
};

export default Button;
