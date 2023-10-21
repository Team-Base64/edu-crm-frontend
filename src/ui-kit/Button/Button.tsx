import React from 'react';
import styles from './Button.module.scss';
import { UiComponentProps, UiComponentPropsMap } from '@ui-kit/interfaces';

const btnSize: UiComponentPropsMap = {
    s: styles.small,
    m: styles.medium,
    l: styles.large,
};
export type ButtonSize = keyof typeof btnSize;

const btnType: UiComponentPropsMap = {
    primary: styles.primary,
    secondary: styles.secondary,
    link: styles.link,
};
export type ButtonType = keyof typeof btnType;

interface ButtonProps extends UiComponentProps {
    type?: ButtonType;
    size?: ButtonSize;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    type = 'primary',
    onClick,
    children,
    size = 'm',
    classes = '',
    disabled = false,
}) => {
    return (
        <button
            onClick={onClick}
            className={[
                styles.button,
                btnType[type],
                btnSize[size],
                classes,
            ].join(' ')}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
