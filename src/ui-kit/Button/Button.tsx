import React from 'react';
import styles from './Button.module.scss';
import { UiComponentProps } from '@ui-kit/interfaces';
import { noop } from '@app/const/consts.ts';

const btnSize = {
    s: styles.small,
    m: styles.medium,
    l: styles.large,
    '': '',
};
export type ButtonSize = keyof typeof btnSize;

const btnType = {
    primary: styles.primary,
    outlined: styles.outlined,
    link: styles.link,
    static: styles.static,
    secondary: styles.secondary,
};
type ButtonType = keyof typeof btnType;

const borderButtonType = {
    s: styles.buttonBorderSmall,
    m: styles.buttonBorderMedium,
    l: styles.buttonBorderLarge,
    '': '',
};
type BorderButtonType = keyof typeof borderButtonType;

interface ButtonProps extends UiComponentProps {
    type?: ButtonType;
    size?: ButtonSize;
    disabled?: boolean;
    border?: BorderButtonType;
    action?: 'submit' | 'reset' | 'button';
    id?: string;
}

const Button: React.FC<ButtonProps> = ({
    type = 'primary',
    onClick,
    children,
    size = 'm',
    classes = '',
    border = 'm',
    disabled = false,
    action = 'submit',
    id,
}) => {
    return (
        <button
            onClick={disabled ? noop : onClick}
            className={[
                styles.button,
                btnType[type],
                btnSize[size],
                borderButtonType[border],
                classes,
            ].join(' ')}
            disabled={disabled}
            type={action}
            id={id}
        >
            {children}
        </button>
    );
};

export default Button;
