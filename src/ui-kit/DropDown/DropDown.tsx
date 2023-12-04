import React, { useId } from 'react';
import styles from './DropDown.module.scss';
import InputBase, { InputBaseProps } from '@ui-kit/InputBase/InputBase';
import basestyles from '../InputBase/InputBase.module.scss';
import Icon from '@ui-kit/Icon/Icon';
import Button from '@ui-kit/Button/Button';

interface DropDownProps extends Omit<InputBaseProps, 'button'> {
    //React.InputHTMLAttributes<HTMLSelectElement> {
    values: (number | string)[];
    placeholder?: number | string;
    initial?: number | string;
    name?: string;
    formatTitle?: (value: number | string) => number | string;
    disabled?: boolean;
    onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

export const DropDown: React.FC<DropDownProps> = ({
    formatTitle,
    values,
    initial,
    placeholder = 'Выберите значение',
    disabled = false,
    classes,
    name,
    onChange,
    ...rest
}) => {
    const key = useId();
    const options = [
        <option
            style={{ display: 'none' }}
            key={`${key}-null`}
            value={'initial-placeholder'}
        >
            {placeholder}
        </option>,
        ...values.map((value) => (
            <option
                key={`${key}-${value}`}
                value={value}
            >
                {formatTitle ? formatTitle(value) : value}
            </option>
        )),
    ];
    const initialOption =
        values.find((v) => v.toString() === initial?.toString()) ??
        'initial-placeholder';
    return (
        <InputBase
            {...rest}
            classes={[styles.select, classes].join(' ')}
            button={
                <Button
                    type="link"
                    disabled={disabled}
                >
                    <Icon name="arrowDown" />
                </Button>
            }
        >
            <select
                name={name}
                className={basestyles.input}
                onChange={onChange}
                defaultValue={initialOption}
                disabled={disabled}
            >
                {options}
            </select>
        </InputBase>
    );
};
