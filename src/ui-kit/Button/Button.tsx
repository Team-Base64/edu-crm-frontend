import React from 'react';
import styles from './Button.module.scss';
import { UiComponentProps } from '@ui-kit/interfaces';

const btnSize = {
    s: styles.ButtonSizeS,
    m: styles.ButtonSizeM,
    l: styles.ButtonSizeL,
};
export type ButtonSize = keyof typeof btnSize;

const btnType = {
    primary: styles.ButtonModePrimary,
    secondary: styles.ButtonModeSecondary,
    link: styles.ButtonModeLink,
};
export type ButtonType = keyof typeof btnType;

interface ButtonProps extends UiComponentProps {
    type: ButtonType;
    size: ButtonSize;
}

const Button: React.FC<ButtonProps> = ({
    type,
    onClick,
    children,
    size,
    classes = '',
}) => {
    return (
        <button
            onClick={onClick}
            className={[
                styles.Button,
                classes,
                btnSize[size],
                btnType[type],
            ].join(' ')}
        >
            {children}
        </button>
    );
};

export default Button;
