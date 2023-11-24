import { UiComponentProps } from '@ui-kit/interfaces';
import React from 'react';
import styles from './Checkbox.module.scss';

const sizeStyle = {
    s: styles.s,
    m: styles.m,
    l: styles.l,
};

type Size = keyof typeof sizeStyle;

const typeStyle = {
    primary: styles.primary,
    secondary: styles.secondary,
};

type Type = keyof typeof typeStyle;

interface CheckboxProps extends UiComponentProps {
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    checked: boolean;
    size?: Size;
    type?: Type;
}

const Checkbox: React.FC<CheckboxProps> = ({
    onChange,
    checked,
    classes,
    size = 'm',
    type = 'primary',
}) => {
    return (
        <input
            className={[
                classes,
                typeStyle[type],
                sizeStyle[size],
                styles.checkbox,
            ].join(' ')}
            type="checkbox"
            checked={checked}
            onChange={onChange}
        />
    );
};

export default Checkbox;
