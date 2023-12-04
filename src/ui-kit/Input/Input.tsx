import React from 'react';
import basestyles from '../InputBase/InputBase.module.scss';
import InputBase, { InputBaseProps } from '@ui-kit/InputBase/InputBase';

export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'children'>,
        Omit<InputBaseProps, 'children'> {
    inputRef?: React.LegacyRef<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({
    inputRef,
    label,
    sizeType,
    border,
    classes,
    icon,
    button,
    errors,
    ...rest
}) => {
    const baseProps = {
        label,
        sizeType,
        border,
        classes,
        icon,
        button,
        errors,
    };

    return (
        <InputBase {...baseProps}>
            <input
                ref={inputRef}
                className={[basestyles.input].join(' ')}
                {...rest}
            />
        </InputBase>
    );
};

export default Input;
