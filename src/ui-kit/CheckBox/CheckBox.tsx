import { UiComponentProps } from '@ui-kit/interfaces';
import React from 'react';
import styles from './CheckBox.module.scss';

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

interface CheckBoxProps extends UiComponentProps {
    state: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    size?: Size;
    type?: Type;
}

const CheckBox: React.FC<CheckBoxProps> = ({
    state,
    classes,
    size = 'm',
    type = 'primary',
}) => {
    const [checked, toggle] = state;
    return (
        <>
            <input
                className={[
                    classes,
                    typeStyle[type],
                    sizeStyle[size],
                    styles.checkbox,
                ].join(' ')}
                type="checkbox"
                defaultChecked={checked}
                onChange={() => {
                    toggle((s) => !s);
                }}
            />
        </>
    );
};

export default CheckBox;
